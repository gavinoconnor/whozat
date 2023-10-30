import { shuffle } from '../utils'

export const animalsData = [
  {animal: "alicorn", category: "other"}, 
  {animal: "bat", category: "flying"}, 
  {animal: "bee", category: "flying"}, 
  {animal: "bird", category: "flying"}, 
  {animal: "bugs", category: "flying"}, 
  {animal: "cat", category: "ground"}, 
  {animal: "crab", category: "water"}, 
  {animal:"cow", category: "ground"}, 
  {animal: "crow", category: "flying"}, 
  {animal: "deer", category: "ground"}, 
  {animal:"dinosaur", category: "other"}, 
  {animal:"dog", category: "ground"}, 
  {animal:"dolphin", category: "water"}, 
  {animal:"dove", category: "flying"}, 
  {animal:"dragon", category: "other"}, 
  {animal:"duck", category: "water"}, 
  {animal:"elephant", category: "ground"}, 
  {animal:"fish", category: "water"}, 
  {animal:"frog", category: "water"}, 
  {animal:"hippo", category: "water"}, 
  {animal:"horse", category: "ground"}, 
  {animal:"lobster", category: "water"}, 
  {animal: "locust", category: "flying"}, 
  {animal: "monkey", category: "ground"}, 
  {animal: "mosquito", category: "flying"}, 
  {animal: "narwhal", category: "water"}, 
  {animal:"otter", category: "water"}, 
  {animal:"pegasus", category: "other"}, 
  {animal:"pig", category: "ground"}, 
  {animal:"rabbit", category: "ground"}, 
  {animal:"raccoon", category: "ground"}, 
  {animal:"ram", category: "ground"}, 
  {animal:"sheep", category: "ground"}, 
  {animal:"shrimp", category: "water"}, 
  {animal:"snake", category: "water"}, 
  {animal:"spider", category: "ground"}, 
  {animal:"squid", category: "water"}, 
  {animal:"squirrel", category: "ground"}, 
  {animal:"turtle", category: "water"}, 
  {animal:"unicorn", category: "other"}, 
  {animal:"whale", category: "water"}, 
  {animal:"worm", category: "ground"}
]

let idCounter = 1

const colorClasses = ["green", "blue", "pink", "yellow"]

export const generateTiles = (selectedAnimals) => {
  const shuffledColors = shuffle(colorClasses)
 
  return selectedAnimals.flatMap((animalData, index) => {
    const tileColor = shuffledColors[index % shuffledColors.length]
    return Array(3).fill().map(() => ({
      id: idCounter++,
      animal: animalData.animal,
      category: animalData.category,
      isHeld: false,
      isMatched: false,
      colorClass: tileColor
    }))
  })
}
