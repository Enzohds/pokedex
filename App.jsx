import { useEffect, useState } from 'react';
import './App.css';

const Pokedex = () => {
  const[entrada,setEntrada] = useState('')
  const[pokemon,setPokemon] = useState(null)
  const[contador,setContador] = useState(0)

  const buscar = () => {
    const solicitacao = entrada.length < 1 ? contador : entrada.toLocaleLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${solicitacao}`;

    fetch(url).then(resposta => resposta.json())
    .then(dados => {
      setPokemon(dados);
      setContador(dados.id)
      setEntrada('')
    })

    .catch(erro => {
      setPokemon(null);
      console.log('Pokemón não encontrado. ', erro);
    })

  }

  const proximo = () => {
    setContador(prox => prox + 1);
    buscar()
  }

  const anterior = () => {
    setContador(antes => antes + 1);
    buscar()
  }

  useEffect(() => {
    buscar()
  }, [contador])

  return(
    <div className="painel">
      <div className="frontal">
      <img src="https://cdn3.iconfinder.com/data/icons/pokemon-go-3/512/pokemon_go_play_game_cinema_film_movie-512.png"
        alt="pokebola" id="pokebola" />
        <h1>Pokemon</h1>
      
      

      <div id="tela">
        {pokemon && (
          <>
          <h2>{pokemon.name}</h2>

          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`} alt={pokemon.name} className='pokemon'/>

          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${pokemon.id}.gif`} alt={pokemon.name} className='pokemon' />

          <p>Id: {pokemon.id}</p>

          <p>Tipo: {pokemon.types.map(type => type.type.name).join(', ')}          
          </p>
          <p>Habilidades: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
          </>
        )}
        {!pokemon && <p> Pokemón não encontrado! </p>}
      </div>

        <input type="text" id="entrada" value={entrada} onChange={(e) => setEntrada(e.target.value)} 
        placeholder="Digite o pokemon..." />
        <button onClick={buscar}>Pesquisar</button>
        <br />
        <button onClick={anterior}>Anterior</button>
        <button onClick={proximo}>Proximo</button>
      </div>
    </div>
  )
}

export default Pokedex;