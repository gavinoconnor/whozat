import { useState } from 'react'
import './App.css'
import AnimalTile from './AnimalTile'



function App() {

  const animalNames = [
    "alicorn", "bat", "bee", "bird", "bugs", "cat", "crab", "cow", "crow", "deer", 
    "dinosaur", "dog", "dolphin", "dove", "dragon", "duck", "elephant", "fish", 
    "frog", "hippo", "horse", "lobster", "locust", "monkey", "mosquito", "narwhal", 
    "otter", "pegasus", "pig", "rabbit", "raccoon", "ram", "sheep", "shrimp", "snake", 
    "spider", "squid", "squirrel", "turtle", "unicorn", "whale", "worm"
  ]

  const [shuffledAnimals, setShuffledAnimals] = useState(() => {
    const allShuffled = shuffle(animalNames)
    const selected = allShuffled.slice(0, 4)
    return [...selected, ...selected, ...selected]
  })

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

  function handleClick() {
    console.log("click")
  }
  
  return (
    <div className="App">
      <h2>WHOZAT!?</h2>

      <div className="wrapper">
        <div className="tile-container">
          {shuffledAnimals.map((animal, index) => (
            <AnimalTile 
              key={index} 
              value={animal} 
              handleClick={handleClick}
            />
          ))}
        </div>
      </div>
      {/* end wrapper */}
    </div>
  );
}

export default App;
