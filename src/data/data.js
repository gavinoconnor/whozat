export const animalsData = [
  {animal: "alicorn", category: "other"}, 
  {animal: "bat", category: "mammal"}, 
  {animal: "bee", category: "insect"}, 
  {animal: "bird", category: "bird"}, 
  {animal: "bugs", category: "insect"}, 
  {animal: "cat", category: "mammal"}, 
  {animal: "crab", category: "fish"}, 
  {animal:"cow", category: "mammal"}, 
  {animal: "crow", category: "bird"}, 
  {animal: "deer", category: "mammal"}, 
  {animal:"dinosaur", category: "other"}, 
  {animal:"dog", category: "mammal"}, 
  {animal:"dolphin", category: "mammal"}, 
  {animal:"dove", category: "bird"}, 
  {animal:"dragon", category: "other"}, 
  {animal:"duck", category: "bird"}, 
  {animal:"elephant", category: "mammal"}, 
  {animal:"fish", category: "fish"}, 
  {animal:"frog", category: "amphibian-reptile"}, 
  {animal:"hippo", category: "mammal"}, 
  {animal:"horse", category: "mammal"}, 
  {animal:"lobster", category: "fish"}, 
  {animal: "locust", category: "insect"}, 
  {animal: "monkey", category: "mammal"}, 
  {animal: "mosquito", category: "insect"}, 
  {animal: "narwhal", category: "fish"}, 
  {animal:"otter", category: "mammal"}, 
  {animal:"pegasus", category: "other"}, 
  {animal:"pig", category: "mammal"}, 
  {animal:"rabbit", category: "mammal"}, 
  {animal:"raccoon", category: "mammal"}, 
  {animal:"ram", category: "mammal"}, 
  {animal:"sheep", category: "mammal"}, 
  {animal:"shrimp", category: "fish"}, 
  {animal:"snake", category: "amphibian-reptile"}, 
  {animal:"spider", category: "insect"}, 
  {animal:"squid", category: "fish"}, 
  {animal:"squirrel", category: "mammal"}, 
  {animal:"turtle", category: "amphibian-reptile"}, 
  {animal:"unicorn", category: "other"}, 
  {animal:"whale", category: "mammal"}, 
  {animal:"worm", category: "insect"}
]

let idCounter = 1

export const generateTiles = (selectedAnimals) => {
  return selectedAnimals.flatMap(animalData => {
    return Array(3).fill().map(() => ({
      id: idCounter++,
      animal: animalData.animal,
      category: animalData.category,
      isHeld: false,
      isMatched: false
    }))
  })
}
