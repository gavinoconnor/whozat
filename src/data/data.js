export const baseAnimals = [
  "alicorn", "bat", "bee", "bird", "bugs", "cat", "crab", "cow", "crow", "deer", 
  "dinosaur", "dog", "dolphin", "dove", "dragon", "duck", "elephant", "fish", 
  "frog", "hippo", "horse", "lobster", "locust", "monkey", "mosquito", "narwhal", 
  "otter", "pegasus", "pig", "rabbit", "raccoon", "ram", "sheep", "shrimp", "snake", 
  "spider", "squid", "squirrel", "turtle", "unicorn", "whale", "worm"
]

let idCounter = 1
export const initialTiles = baseAnimals.flatMap(animal => {
  return Array(3).fill().map(() => ({
    id: idCounter++,
    animal: animal,
    isHeld: false
  }))
})

  // confirmed Font Awesome icons 
  // const initialTiles = [
  //   { animal: 'alicorn', isHeld: false },
  //   { animal: 'bat', isHeld: false },
  //   { animal: 'bee', isHeld: false },
  //   { animal: 'bird', isHeld: false },
  //   { animal: 'bugs', isHeld: false },
  //   { animal: 'cat', isHeld: false },
  //   { animal: 'crab', isHeld: false },
  //   { animal: 'cow', isHeld: false },
  //   { animal: 'crow', isHeld: false },
  //   { animal: 'deer', isHeld: false },
  //   { animal: 'dinosaur', isHeld: false },
  //   { animal: 'dog', isHeld: false },
  //   { animal: 'dolphin', isHeld: false },
  //   { animal: 'dove', isHeld: false },
  //   { animal: 'dragon', isHeld: false },
  //   { animal: 'duck', isHeld: false },
  //   { animal: 'elephant', isHeld: false },
  //   { animal: 'fish', isHeld: false },
  //   { animal: 'frog', isHeld: false },
  //   { animal: 'hippo', isHeld: false },
  //   { animal: 'horse', isHeld: false },
  //   { animal: 'lobster', isHeld: false },
  //   { animal: 'locust', isHeld: false },
  //   { animal: 'monkey', isHeld: false },
  //   { animal: 'mosquito', isHeld: false },
  //   { animal: 'narwhal', isHeld: false },
  //   { animal: 'otter', isHeld: false },
  //   { animal: 'pegasus', isHeld: false },
  //   { animal: 'pig', isHeld: false },
  //   { animal: 'rabbit', isHeld: false },
  //   { animal: 'raccoon', isHeld: false },
  //   { animal: 'ram', isHeld: false },
  //   { animal: 'sheep', isHeld: false },
  //   { animal: 'shrimp', isHeld: false },
  //   { animal: 'snake', isHeld: false },
  //   { animal: 'spider', isHeld: false },
  //   { animal: 'squid', isHeld: false },
  //   { animal: 'squirrel', isHeld: false },
  //   { animal: 'turtle', isHeld: false },
  //   { animal: 'unicorn', isHeld: false },
  //   { animal: 'whale', isHeld: false },
  //   { animal: 'worm', isHeld: false },
  // ]