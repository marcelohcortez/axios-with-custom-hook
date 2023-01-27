import pokemonInstance from './helper/pokemon-instance'

import useAxios from './hook/use-axios'

import './App.css'

export default function App() {
  const [pokemonData, loading, error] = useAxios({
    axiosInstance: pokemonInstance, 
    method: 'GET', 
    url: 'pokemon', 
  })

  if (loading){
    return <div>Loading</div>
  }

  if (error){
    return <div>Sorry, no info could be loaded. <br/> Please try again.</div>
  }
    
  return (
    <main>
      <div>
        <h1>Pokemon List</h1>
        {pokemonData.results.map((pokemon, index) => (
          <div key={index}>{pokemon.name}</div>
        ))}
      </div>
    </main>
  )
}
