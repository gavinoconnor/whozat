const btn = document.getElementById('btn')
const imageContainer = document.getElementById('image-container')
const placeholderText = document.getElementById('placeholder-text')
const animalName = document.querySelector('.animal-name')

// const animalSound = document.querySelector('.animal-sound')

// Temporary animal array - need to query animals directly
// to avoid , see docs
const animalNames = [
  'Cat', 'Dog', 'Elephant', 'Bunny', 'Lion',
  // 'Bear', 'Eagle', 'Crow', 'Wolf', 'Fox', 
  // 'Giraffe', 'Bull', 'Cow', 'Pig', 'Chicken', 
  // 'Shark', 'Goldfish', 'Dolphin', 'Whale',
  // 'Porcupine', 'Squirrel', 'Mouse', 'Bat', 
  // 'Coyote', 'Rabbit', 'Chipmunk', 'Raccoon',
  // 'Lynx', 'Otter'
]
// TO DO: convert animalNames into
// an array of objects so you can 
// add sounds, etc
function getRandomAnimalName() {
  const randomIndex = Math.floor(Math.random() * animalNames.length);
  return animalNames[randomIndex];
}

function handleClick() {
  // Remove any existing image
  const existingImage = document.querySelector('.animal-img');
  
  if (existingImage) {
    existingImage.remove();
  }
  
  const randomAnimalName = getRandomAnimalName();
  animalName.textContent = randomAnimalName;

  // Create an img element
  const animalImg = document.createElement('img');
  animalImg.className = 'animal-img'; // Set class to apply CSS styling
  animalImg.alt = randomAnimalName; // Set alt attribute to the animal name  
  // TO DO: abstract to a function outside the click handler

  const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=myKey&collections=animals&query=${randomAnimalName}&w=400`;
  placeholderText.classList.add('hidden')

  fetch(unsplashUrl)
    .then(response => {
      if (!response.ok) {
        throw Error("Something went wrong.")
      }
      return response.json()
    })
    .then(data => {
      animalImg.src = data.urls.small
      imageContainer.appendChild(animalImg) // append to DOM after src is set
    })
    .catch(error => {
      console.error(error)
      // Remove the img element and show the placeholder text again
      animalImg.remove();
      placeholderText.classList.remove('hidden');
    })

}


btn.addEventListener('click', handleClick)