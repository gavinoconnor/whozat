import icons from "./animals.js"

const btn = document.getElementById('btn')
const iconEl = document.getElementById('icon')
const animalNameEl = document.getElementById('animal-name')
const placeholderText = document.getElementById('placeholder-text')

const ICON_PREFIX = 'fa-'

function handleClick() {
  btn.disabled = true

  let randomIcon = icons[Math.floor(Math.random() * icons.length)]
  
  // Convert class list to an array, find fa-animalName
  const currentIconName = Array.from(iconEl.classList).find(cls => {
    return cls.startsWith(ICON_PREFIX) && 
           cls !== 'fa-light' && 
           !cls.includes('x')
  })

  if (currentIconName) {
    iconEl.classList.remove(currentIconName)
    placeholderText.classList.add('hidden')
  }

  // Set the new animal and name
  iconEl.classList.remove('hidden')
  iconEl.classList.add(`${ICON_PREFIX}${randomIcon}`)
  animalNameEl.textContent = randomIcon.toUpperCase()

  // Enable button after 1 second
  setTimeout(() => {
    btn.disabled = false
  }, 2000)
}

btn.addEventListener('click', handleClick)

// Prevent double-taps
let lastTouchEnd = 0

document.addEventListener('touchend', event => {
  const now = Date.now()
  if (now - lastTouchEnd <= 300) {
    event.preventDefault()
  }
  lastTouchEnd = now
})


