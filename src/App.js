import { useState } from 'react'
import './App.css'
import AnimalTile from './AnimalTile'



function App() {
  // confirmed Font Awesome icons 
  const animalNames = [
    "alicorn", "bat", "bee", "bird", "bugs", "cat", "crab", "cow", "crow", "deer", 
    "dinosaur", "dog", "dolphin", "dove", "dragon", "duck", "elephant", "fish", 
    "frog", "hippo", "horse", "lobster", "locust", "monkey", "mosquito", "narwhal", 
    "otter", "pegasus", "pig", "rabbit", "raccoon", "ram", "sheep", "shrimp", "snake", 
    "spider", "squid", "squirrel", "turtle", "unicorn", "whale", "worm"
  ]

  const [animalTiles, setAnimalTiles] = useState(() => {
    const selected = selectAnimals(animalNames)
    return generateAnimalTiles(selected)
  })

  function selectAnimals(allAnimals) {
    const shuffled = shuffle(allAnimals)
    return shuffled.slice(0, 4)
  }

  function generateAnimalTiles(selectedAnimals) {
    return [...selectedAnimals, ...selectedAnimals, ...selectedAnimals]
  }

  function shuffle(array) {
    let shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      // swap elements 
      let temp = shuffledArray[i]
      shuffledArray[i] = shuffledArray[randomIndex]
      shuffledArray[randomIndex] = temp
    }
    return shuffledArray
  }

  function getNewAnimals() {
    const selected = selectAnimals(animalNames)
    setAnimalTiles(generateAnimalTiles(selected))
  }

  function scramble() {
    setAnimalTiles(prevTiles => shuffle([...prevTiles]))
  }

  function handleClick() {
    console.log("click")
  }

  const renderedTiles = animalTiles.map((animal, index) => (
    <AnimalTile 
      key={index} 
      value={animal} 
      handleClick={handleClick}   
    />
  ))
  
  return (
    <div className="App">
      <h2>WHOZAT!?</h2>
      <div className="wrapper">
        <div className="tile-container">
          {renderedTiles}
        </div>
        <button onClick={getNewAnimals}>New Animals</button>
        <button onClick={scramble}>Scramble</button>
      </div>
      {/* end wrapper */}
    </div>
  );
}

export default App;
