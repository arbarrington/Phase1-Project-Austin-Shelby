// html variables that can be grabbed in any function
let mainImg = document.getElementById('mainImage')
let guessForm = document.getElementById('guessInput')
let scoreDisplay = document.getElementById('scoreDisplay')
let previousGuess = document.getElementById('previousGuess')
let previousAnswer = document.getElementById('previousAnswer')
let favDogTable = document.querySelector('#favoritesTable')


// initialize variables for the current dawg on the screen
let currentDawgBreed
let currentBreedGuess
let currentDawgBreedWebsiteStyle

// initializes player's score
let currentScore = 0;
scoreDisplay.textContent = `Your Score: ${currentScore}`

// initializes the website
nextRound()
guessingForm()

// this function takes in the data obj, selects the url, and then dissects it down to a dawg breed string in plain english
function getDawgBreed(data) {
    currentDawgBreed = data.message.substring(30) // knocks off the http stuff that is always there
    let indexAtEndOfBreed = currentDawgBreed.indexOf('/',0) // figures out where the breed ends
    currentDawgBreed = currentDawgBreed.substring(0,indexAtEndOfBreed)
    currentDawgBreedWebsiteStyle = currentDawgBreed // keeps a version of the current dawg breed in a style that the api uses in their database

    if (currentDawgBreed.includes('-')) {
        let indexOfDash = currentDawgBreed.indexOf('-')
        currentDawgBreed = `${currentDawgBreed.substring((indexOfDash+1))} ${currentDawgBreed.substring(0,indexOfDash)}` 
    }
    console.log(`getDawgBreed: ${currentDawgBreed}`) // cheater hack to see breed in the dev tools
}

// GAME

// breed guessing funtion! runs the whole game part of the website
function guessingForm(){
    // event listener for user input
    guessForm.addEventListener('submit', e => {
        e.preventDefault()
        currentBreedGuess = e.target['guessText'].value
        guessForm.reset()
    
    // if the breed is right, the current score is incremented by 1 and displayed
    if (currentBreedGuess == currentDawgBreed) {
        currentScore ++
        scoreDisplay.textContent = `Your Score: ${currentScore}`
    }

    // fill in previous round info, loads the next round of the game
    previousRoundData()
    nextRound()
    })
}

// fills in page with info from the previous round data
function previousRoundData() {
    previousGuess.textContent = currentBreedGuess
    previousAnswer.textContent = currentDawgBreed
}

// peforms the fetch to the api to get the dog photo and breed
function nextRound() {
    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(resp => resp.json())
    .then(data => {
        mainImg.src = data.message
        getDawgBreed(data)
    })
}

// FAVORITES
let heart = document.querySelector('.heart');
heart.addEventListener('click', (e) => {
e.preventDefault();
addToDogPack();
})

function addToDogPack(){
    let newFavDogSlot = document.createElement('td');
    let newFavDogBreed = document.createElement('a');
    newFavDogBreed.href = `https://images.dog.ceo/breeds/${currentDawgBreedWebsiteStyle}/images/random`;
    newFavDogBreed.textContent = currentDawgBreed;
    newFavDogSlot.append(newFavDogBreed);
    favDogTable.append(newFavDogSlot);
}














