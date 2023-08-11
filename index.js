const btn = document.getElementById('btn');
const animalImg = document.querySelector('.animal-img')
const animalName = document.querySelector('.animal-name')
// const animalSound = document.querySelector('.animal-sound')


function handleClick() {
  // Temporary animal array
  // Also need to incorporate sounds
  const animals = [
    { name: 'cat'},
    { name: 'dog'},
    { name: 'badger'},
    { name: 'wolf'},
    { name: 'fox'},
    { name: 'eagle'},
    { name: 'bear'},
    { name: 'lion'},
    { name: 'giraffe'}
  ]

  const randomAnimal = animals[Math.floor(Math.random() * animals.length)]

  const unsplashUrl = `https://api.unsplash.com/photos/random?query=${randomAnimal.name}&client_id={myKey}`;

  fetch(unsplashUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      animalImg.src = data.urls.small
      animalName.textContent = randomAnimal.name; // Update name
      // animalSound.src = randomAnimal.sound; // Update sound
      // animalSound.play(); // Play sound
    })
    .catch(error => console.error('Error fetching image', error))

}


btn.addEventListener('click', handleClick)