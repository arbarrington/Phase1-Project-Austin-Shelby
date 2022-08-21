let mainImg = document.getElementById('mainImage')
let guessForm = document.getElementById('guessInput')
let scoreDisplay = document.getElementById('scoreDisplay')
let previousGuess = document.getElementById('previousGuess')
let previousAnswer = document.getElementById('previousAnswer')

// initialize variables for the current dawg on the screen
let currentDawgBreed
let currentDawgURL

// initialize guessing variables
let breedGuess
let currentScore = 0;

// data so can save curret dawg as favorite
let previousDawgBreed
let previousBreedGuess

// initializes the displays to be empty
scoreDisplay.textContent = `Your Score: ${currentScore}`




fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(resp => resp.json())
    .then(data => {
        mainImg.src = data.message
        getDawgBreed(data)
        guessingForm(currentDawgBreed)
    })

// this function takes in the data obj, selects the url, and then dissects it down to a dawg breed string in plain english
function getDawgBreed(data) {
    currentDawgBreed = data.message.substring(30) // knocks off the http stuff that is always there
    let indexAtEndOfBreed = currentDawgBreed.indexOf('/',0) // figures out where the breed ends
    currentDawgBreed = currentDawgBreed.substring(0,indexAtEndOfBreed)

    if (currentDawgBreed.includes('-')) {
        let indexOfDash = currentDawgBreed.indexOf('-')
        currentDawgBreed = `${currentDawgBreed.substring((indexOfDash+1))} ${currentDawgBreed.substring(0,indexOfDash)}` 
    }
    console.log(currentDawgBreed)
    return(currentDawgBreed)
}

// GAME

// breed guessing funtion!
function guessingForm(){
    // event listener for user input
    guessForm.addEventListener('submit', e => {
        e.preventDefault()
        breedGuess = e.target['guessText'].value
        console.log(breedGuess)
        guessForm.reset()
    
    // if the breed is right, the current score is incremented by 1 and displayed
    if (breedGuess == currentDawgBreed) {
        currentScore ++
        scoreDisplay.textContent = `Your Score: ${currentScore}`
    }

    // calls function to build out past game history section
    //previousRoundData(breedGuess,currentDawgBreed)

    nextRound()
    })

}

// previous round data
function previousRoundData(breedGuess,currentDawgBreed) {
    // logs the current as previous
    previousBreedGuess = breedGuess
    previousDawgBreed = currentDawgBreed
    previousGuess.textContent = previousBreedGuess
    previousAnswer.textContent = previousDawgBreed
}





// FAVORITES

let heart = document.querySelector('.heart');
//let mainImg = document.querySelector('#form');
// form.append(heart);
heart.addEventListener('click', (e) => {
e.preventDefault();
console.log('I was clicked');
addToDogPack();
})

// instead of string interpolation for the link to dawg breed, should just pass in previous dawg url
function addToDogPack(){
    let newFavDogSlot = document.createElement('td');
    let newFavDogBreed = document.createElement('a');
    let favDogTable = document.querySelector('#favoritesTable')
    newFavDogBreed.href = `https://dog.ceo/api/breed/${currentDawgBreed}/images/random`;
    newFavDogBreed.textContent = currentDawgBreed;
    newFavDogSlot.append(newFavDogBreed);
    favDogTable.append(newFavDogSlot);
    console.log(currentDawgBreed);
}


function nextRound() {
    fetch(`https://dog.ceo/api/breeds/image/random`)
    .then(resp => resp.json())
    .then(data => {
        mainImg.src = data.message
        getDawgBreed(data)
        guessingForm(currentDawgBreed)
    })
    previousRoundData(breedGuess,currentDawgBreed)
}














