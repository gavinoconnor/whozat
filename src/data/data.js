export const animalNameArray = [
  "alicorn", "bat", "bee", "bird", "bugs", "cat", "crab", "cow", "crow", "deer", 
  "dinosaur", "dog", "dolphin", "dove", "dragon", "duck", "elephant", "fish", 
  "frog", "hippo", "horse", "lobster", "locust", "monkey", "mosquito", "narwhal", 
  "otter", "pegasus", "pig", "rabbit", "raccoon", "ram", "sheep", "shrimp", "snake", 
  "spider", "squid", "squirrel", "turtle", "unicorn", "whale", "worm"
]

let idCounter = 1
export const initialTiles = animalNameArray.flatMap(animal => {
  return Array(3).fill().map(() => ({
    id: idCounter++,
    animal: animal,
    isHeld: false
  }))
})
