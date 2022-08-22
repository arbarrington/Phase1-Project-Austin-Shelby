// html variables that can be grabbed in any function
let mainImg = document.getElementById('mainImage')
let guessForm = document.getElementById('guessInput')
let scoreDisplay = document.getElementById('scoreDisplay')
let previousRoundDisplay = document.getElementById('previousRoundDisplay')
let playerStatusDisplay = document.getElementById('playerStatus')
let previousGuess = document.getElementById('previousGuess')
let previousAnswer = document.getElementById('previousAnswer')
let favDogTable = document.querySelector('#favoritesTable')
let userNameBox = document.getElementById('userNameBox');
let likeButton = document.getElementById('likeButtonID');
let userNameForm = document.getElementById('yourName')

// initialize variables for the current dawg on the screen
let currentDawgBreed
let currentBreedGuess
let currentDawgBreedWebsiteStyle
let playerUserName;

// initializes player's score
let currentScore = 0;
scoreDisplay.textContent = currentScore

// keep track of favorites, initializes to 0 and empty!
let favsArray = []
let whichFav = 0;

// initializes the website
nextRound()
guessingForm()
getUserName()

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

    // if the dog that was just guessed was added to favorites, it changes the ?? to the breed
    if (hasBeenClicked == true) {
        noCheating()
    }

    // shows the player's status
    playerStatusDisplay.textContent = scoreFeedbackArray[currentScore]

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
let hasBeenClicked = false;
likeButton.addEventListener('click', (e) => {
    e.preventDefault();
    addToDogPack();
    favsArray[whichFav] = currentDawgBreedWebsiteStyle
    hasBeenClicked = true
    whichFav++
})

function addToDogPack(){
    let newFavDogBreedURL = currentDawgBreedWebsiteStyle

    let newFavDogSlot = document.createElement('td');
    let newFavDogBreed = document.createElement('a');
    newFavDogBreed.setAttribute('id',`fav${whichFav}`)

    dawgPackLinks(newFavDogBreed,newFavDogBreedURL)
    fetchDawgPackPhoto(newFavDogBreed,newFavDogBreedURL)
    newFavDogBreed.textContent = `??`
    
    newFavDogSlot.append(newFavDogBreed);
    favDogTable.append(newFavDogSlot);
}

// makes the links in the dawg pack table active without having to be clicked first
function dawgPackLinks (newFavDogBreed,newFavDogBreedURL) {
    newFavDogBreed.addEventListener('click', e => {
        e.preventDefault
        fetchDawgPackPhoto(newFavDogBreed,newFavDogBreedURL) // but then get fresh photos for each click after the first
    })
}

// gets fresh dog photos for the dawg pack
function fetchDawgPackPhoto(newFavDogBreed,newFavDogBreedURL) {
    fetch(`https://dog.ceo/api/breed/${newFavDogBreedURL}/images/random`)
            .then(resp => resp.json())
            .then(data => {
            newFavDogBreed.href = data.message
        })
}

function noCheating() {
    let previousFavDawgBreed = document.getElementById(`fav${whichFav-1}`)
    previousFavDawgBreed.textContent = currentDawgBreed
    hasBeenClicked = false
}

// Player Information!
// player status levels
let scoreFeedbackArray = ["Bad Dog!",
     "Apparently old dogs CAN learn new tricks!",
     "You're barking up the right tree!", 
     "Dog-gone-it! You're doing it!",
     "WOOF, there it is! WOOF, there it is!",
     "You have pleased the almighty doge."]

// input player name
// function buildUserSubmitButton() {
//     return userNameEntry.addEventListener('submit', (e) =>
//     handleForm(e));
// }

// function handleForm(e){
//     e.preventDefault()
//     const userObject = {
//         name: e.target.name.value,
//         points: e.target.points.value,
//         favoriteDogs: []
//     }
//     console.log(userObject);
//     saveUserInfo('http://localhost:3000/books', userObject)
//     .catch(e => console.error(e))
// }

// function saveUserInfo (url, userObject) {
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(userObject)
//     })
//     .then((res) => res.json())
//     .then((userObject) => console.log(userObject))
// }

function getUserName() {
    userNameForm.addEventListener('submit', (e) => {
        e.preventDefault()
        playerUserName = e.target['userNameBox'].value
        console.log(playerUserName)
    })
}