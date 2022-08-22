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

let whichFav = 0;

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
        currentDawgBreedWebsiteStyle = currentDawgBreedWebsiteStyle.replace('-','/')
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
    noCheating()
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
whichFav++
})

function addToDogPack(){
    let newFavDogSlot = document.createElement('td');
    let newFavDogBreed = document.createElement('a');
    newFavDogBreed.setAttribute('id',`fav${whichFav}`)
    fetchDawgPackPhoto(newFavDogBreed)
    newFavDogBreed.textContent = `??`
    newFavDogSlot.append(newFavDogBreed);
    favDogTable.append(newFavDogSlot);
}

// makes a fetch to the api to get a photo of a fav dawg (new dawg photo everytime!)
// ISSUE: REQUIRES A FIRST CLICK BEFORE ACTIVATING!?
function fetchDawgPackPhoto(newFavDogBreed) {
    newFavDogBreed.addEventListener("click", e => {
        e.preventDefault
        fetch(`https://dog.ceo/api/breed/${currentDawgBreedWebsiteStyle}/images/random`)
        .then(resp => resp.json())
        .then(data => {
            newFavDogBreed.href = data.message
        })
    })
}

// player status
let scoreFeedbackArray = ["Bad Dog!",
     "Apparently old dogs CAN learn new tricks!",
     "You're barking up the right tree!", 
     "Dog-gone-it! You're doing it!",
     "WOOF, there it is! WOOF, there it is!",
     "You have pleased the almighty doge."]
let scoreFeedbackDiv = document.createElement('div');
let scoreFeedbackHeading = document.createElement('h2');
scoreFeedbackHeading.textContent = scoreFeedbackArray[currentScore + 1];
scoreFeedbackDiv.append(scoreFeedbackHeading);
scoreDisplay.append(scoreFeedbackDiv);

function noCheating() {
    let previousFavDawgBreed = document.getElementById(`fav${whichFav-1}`)
    previousFavDawgBreed.textContent = currentDawgBreed
}

function getUserInfo() {
    fetch('http://localhost:3000/dog_walkers')
    .then((res) => res.json())
    .then((userObject) => console.log(userObject))
}

function saveUserInfo(userObject) {
    fetch('http;:/localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': `application/json`
        },
        body: JSON.stringify(userObject)
    }).then((res) => res.json())
    .then((userObject) => console.log(userObject))
}

//getUserInfo()






// form to add in name
// game updates their score and status
// favorites updates their favorites