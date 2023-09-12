import animals from "./animals.js"

const btn = document.getElementById('btn')
// const imageContainer = document.getElementById('image-container')
// const placeholderText = document.getElementById('placeholder-text')
// const animalName = document.querySelector('.animal-name')

// import animal icons from Font Awesome
console.log(animals)
// store them in an array
// render random animal on click

// function getRandomAnimalName() {
//   const randomIndex = Math.floor(Math.random() * animalNames.length);
//   return animalNames[randomIndex];
// }

function handleClick() {
  console.log("click")

}


btn.addEventListener('click', handleClick)