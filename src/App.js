import { useState } from 'react'
import { shuffle } from './utils'
import { baseAnimals, initialTiles } from './data/data'
import AnimalTile from './AnimalTile'
import './App.css'



function App() {

  const [animalTiles, setAnimalTiles] = useState(() => {
    const selectedAnimals = selectAnimals(baseAnimals)
    return shuffle(getSelectedAnimalTiles(selectedAnimals))
  })

  function selectAnimals(animalArray) {
    const shuffledAnimals = shuffle(animalArray)
    // select and shuffle four animals
    return shuffledAnimals.slice(0, 4)
  }

  function getSelectedAnimalTiles(selectedAnimals) {
    return initialTiles.filter(tile => 
      selectedAnimals.includes(tile.animal))
  }

  function handleClick(tileId) {
    setAnimalTiles(prevTiles => prevTiles.map(tile => 
      tile.id === tileId ? {...tile, isHeld: !tile.isHeld} : tile
    ))
  }
  
  function getNewAnimals() {
    const selected = selectAnimals(baseAnimals)
    setAnimalTiles(shuffle(getSelectedAnimalTiles(selected)))
  }

  function scramble() {
    setAnimalTiles(prevTiles => shuffle([...prevTiles]))
  }

  const renderedTiles = animalTiles.map(tile => (
    <AnimalTile 
      key={tile.id} 
      value={tile.animal}
      isHeld={tile.isHeld} 
      handleClick={() => handleClick(tile.id)}   
    />
  ))
  
  return (
    <div className="App">
      <h2>WHOZAT!?</h2>
      <div className="wrapper">
        <div className="tile-container">
          {renderedTiles}
        </div>
        <div className="button-container">
          <button className="btn" onClick={getNewAnimals}>New Animals</button>
          <button className="btn" onClick={scramble}>Scramble</button>
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
}

export default App;
