// html variables that are used more than once
let entireBody = document.getElementById('theEntireBody')

let logInDiv = document.getElementById('logIn')
let nameCell = document.getElementById('nameCell');
let userNameBox = document.getElementById('userNameBox');

let guessForm = document.getElementById('guessInput')
let scoreDisplay = document.getElementById('scoreDisplay')

let highScoreBusiness = document.getElementById('allTimeHighScoreDisplay')


// initialize variables for the current dawg on the screen
let currentDawgBreed
let currentBreedGuess
let currentDawgBreedWebsiteStyle

// initializes variables for the player's name and object
let playerUserName
let playerID
let playerNameSaved = false
let playerObject = {}

// initializes player's score and previous high score
let numberPrevPlayers
let prevHighScore = 0;
let prevBestPlayer
let currentScore = 0;

// keep track of favorites, initializes to 0 and empty!
let favsArray = []
let whichFav = 0;

// player status levels
let scoreFeedbackArray = 
    ["Bad Dog!",
     "Apparently old dogs CAN learn new tricks!",
     "You're barking up the right tree!", 
     "Dog-gone-it! You're doing it!",
     "WOOF, there it is! WOOF, there it is!",
     "You have pleased the almighty doge."]

     
// takes care of the "log in page" (not actually a seperate page)
entireBody.style.visibility = 'hidden'
logIn()

// initializes the website after login
nextRound()
guessingForm()
initialHighScoreDisplay()
scoreDisplay.textContent = currentScore

// lets the player "log in" to start the game
function logIn() {
    logInDiv.style.visibility = 'visible'
    document.getElementById('logInForm').addEventListener("submit", e => {
        e.preventDefault()
        playerUserName = e.target['userNameBox'].value
        renderUserDiv()
    })
}

// once the log in form is submitted, the rest of the page becomes visible, the log in section
// goes away, the new player is posted to the json
function renderUserDiv() {
    entireBody.style.visibility = "visible"
    nameCell.textContent = playerUserName;
    playerObject.name = playerUserName
    postPlayer(playerObject)
    document.getElementById('nameSubmitMessage').textContent = 'Now Battling for Top Dawg:'
    logInDiv.remove()
}

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
        currentBreedGuess = e.target['guessText'].value.toLowerCase()
        guessForm.reset()
    
    // if the breed is right, the current score is incremented by 1 and displayed
    if (currentBreedGuess == currentDawgBreed) {
        currentScore ++
        scoreDisplay.textContent = currentScore
        if (currentScore > prevHighScore) {
            youBeatHighScore()
        }
    }

    // if the dog that was just guessed was added to favorites, it changes the ?? to the breed
    if (hasBeenClicked == true) {
        noCheating()
    }

    // shows the player's status and logs it into the player object and logs players score too
    document.getElementById('playerStatus').textContent = scoreFeedbackArray[currentScore]
    playerObject.playerStatus = scoreFeedbackArray[currentScore]
    playerObject.score = currentScore
    
    if (playerNameSaved == true) {
        patchCurrentPlayer(playerObject)
    }

    // fill in previous round info, loads the next round of the game
    previousRoundData()
    nextRound()
    })
}

// fills in page with info from the previous round data
function previousRoundData() {
    document.getElementById('previousGuess').textContent = currentBreedGuess
    document.getElementById('previousAnswer').textContent = currentDawgBreed
}

// peforms the fetch to the api to get the dog photo and breed
function nextRound() {
    likeButtonFunction()
    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(resp => resp.json())
    .then(data => {
        document.getElementById('mainImage').src = data.message
        getDawgBreed(data)
    })
}

// FAVORITES
// event listenter on the add to pack button
let hasBeenClicked = false;
function likeButtonFunction() {
    document.getElementById('likeButtonID').addEventListener('click', (e) => {
        e.preventDefault();
        if (hasBeenClicked == false) {
            addToDogPack();
            favsArray[whichFav] = currentDawgBreed
            playerObject.favDawgs = favsArray
            hasBeenClicked = true
            whichFav++
            if (playerNameSaved == true) {
                patchCurrentPlayer(playerObject)
            }
    }
})
}

// adds the current dawg being presented to the current player's favorites
function addToDogPack(){
    let newFavDogBreedURL = currentDawgBreedWebsiteStyle
    let newFavDogBreed = document.createElement('a');
    newFavDogBreed.setAttribute('id',`fav${whichFav}`)

    dawgPackLinks(newFavDogBreed,newFavDogBreedURL)
    fetchDawgPackPhoto(newFavDogBreed,newFavDogBreedURL)
    newFavDogBreed.textContent = `??`
    
    document.querySelector('#favoritesTable').append(newFavDogBreed);
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

// prevents the current breed from displaying in the favorites before a guess is submitted
function noCheating() {
    let previousFavDawgBreed = document.getElementById(`fav${whichFav-1}`)
    previousFavDawgBreed.textContent = `${currentDawgBreed} `
    hasBeenClicked = false
}


// Display High Score
function initialHighScoreDisplay() {
    fetch('http://localhost:3000/players')
    .then(resp => resp.json())
    .then(scoreData => {
        playerID = scoreData.length+1
        scoreData.forEach(player => {
            if (player.score > prevHighScore){
                prevHighScore = player.score
                prevBestPlayer = player.name
            }
        })
        highScoreBusiness.textContent = `${prevBestPlayer} is top dawg with ${prevHighScore} points!`
    })
}

// function is called once the current player beats the previous high score, updates the score on display every round
function youBeatHighScore() {
    highScoreBusiness.textContent = `Holy cow! We have an new top dawg!  Congrats ${playerUserName} on your ${currentScore} points!`
}

// creates a new player element in db.json for the current user
function postPlayer(playerObject) {
    fetch('http://localhost:3000/players', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playerObject)
    })
    .then(playerNameSaved = true)
}

// updates the users favorites, score, and status
function patchCurrentPlayer(playerObject) {
    fetch(`http://localhost:3000/players/${playerID}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(playerObject)
    })
}

