import { shuffle } from '../utils'

export const animalsData = [
  {animal: "alicorn",            category: "myth"},
  {animal: "badger-honey",       category: "savanna"},
  {animal: "bat",                category: "sky"},
  {animal: "bee",                category: "sky"},
  {animal: "bird",               category: "sky"},
  {animal: "bugs",               category: "savanna"},
  {animal: "cat",                category: "farm"},
  {animal: "cat-space",          category: "myth"},
  {animal: "cow",                category: "farm"},
  {animal: "crab",               category: "sea"},
  {animal: "crow",               category: "sky"},
  {animal: "deer",               category: "wild"},
  {animal: "deer-rudolph",       category: "myth"},
  {animal: "dinosaur",           category: "savanna"},
  {animal: "dog",                category: "farm"},
  {animal: "dolphin",            category: "sea"},
  {animal: "dove",               category: "sky"},
  {animal: "dragon",             category: "myth"},
  {animal: "duck",               category: "farm"},
  {animal: "elephant",           category: "savanna"},
  {animal: "fish",               category: "sea"},
  {animal: "frog",               category: "wild"},
  {animal: "hippo",              category: "savanna"},
  {animal: "horse",              category: "farm"},
  {animal: "horse-saddle",       category: "farm"},
  {animal: "kiwi-bird",          category: "wild"},
  {animal: "lobster",            category: "sea"},
  {animal: "locust",             category: "savanna"},
  {animal: "monkey",             category: "wild"},
  {animal: "mosquito",           category: "sky"},
  {animal: "mouse-field",        category: "wild"},
  {animal: "narwhal",            category: "sea"},
  {animal: "otter",              category: "sea"},
  {animal: "pegasus",            category: "myth"},
  {animal: "pig",                category: "farm"},
  {animal: "rabbit",             category: "farm"},
  {animal: "raccoon",            category: "wild"},
  {animal: "ram",                category: "farm"},
  {animal: "sheep",              category: "farm"},
  {animal: "shrimp",             category: "sea"},
  {animal: "snake",              category: "wild"},
  {animal: "spider",             category: "wild"},
  {animal: "spider-black-widow", category: "wild"},
  {animal: "squid",              category: "sea"},
  {animal: "squirrel",           category: "wild"},
  {animal: "turtle",             category: "sea"},
  {animal: "unicorn",            category: "myth"},
  {animal: "whale",              category: "sea"},
  {animal: "worm",               category: "wild"},
]

let idCounter = 1

const colorClasses = ["color-1", "color-2", "color-3", "color-4"]

export const generateTiles = (
  selectedAnimals,
  { tilesPerAnimal = 3, faceDown = false, colorPerAnimal = true } = {}
) => {
  const shuffledColors = shuffle(colorClasses)

  return selectedAnimals.flatMap((animalData, index) => {
    const animalColor = shuffledColors[index % shuffledColors.length]
    return Array(tilesPerAnimal).fill().map(() => ({
      id: idCounter++,
      animal: animalData.animal,
      category: animalData.category,
      isHeld: false,
      isMatched: false,
      isFaceDown: faceDown,
      colorClass: colorPerAnimal
        ? animalColor
        : colorClasses[Math.floor(Math.random() * colorClasses.length)]
    }))
  })
}
