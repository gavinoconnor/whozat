const btn = document.getElementById('btn')
const imageContainer = document.getElementById('image-container')
const placeholderText = document.getElementById('placeholder-text')
const animalName = document.querySelector('.animal-name')

// const animalSound = document.querySelector('.animal-sound')

// Temporary animal array
// Also need to incorporate sounds
const animalNames = ['Cat', 'Dog', 'Elephant', 'Tiger', 'Lion'];

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


  // Append the img element to the container
  imageContainer.appendChild(animalImg);


  const unsplashUrl = `https://api.unsplash.com/photos/random?query=${randomAnimalName}&w=400&client_id={myKey}`;

  fetch(unsplashUrl)
    .then(response => response.json())
    .then(data => {
      placeholderText.classList.add('hidden')
      animalImg.src = data.urls.small
    })
    .catch(error => {
      // Handle errors
      console.error('Error fetching image', error)
      // Remove the img element and show the placeholder text again
      animalImg.remove();
      placeholderText.classList.remove('hidden');
    })

}


btn.addEventListener('click', handleClick)