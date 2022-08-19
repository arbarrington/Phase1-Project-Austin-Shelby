let mainImg = document.getElementById('mainImage')

let currentDawgBreed
let currentDawgURL
let previousDawgBreed

let breedGuess
let previousBreedGuess

fetch(`https://dog.ceo/api/breeds/image/random`)
.then(resp => resp.json())
.then(data => {
    mainImg.src = data.message
    getDawgBreed(data)
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

guessingForm(currentDawgBreed)

// breed input for guess
function guessingForm(currentDawgBreed){
    console.log(currentDawgBreed)

}

// if guess is right or not

// score updater

// previous round data

// FAVORITES

// add fav breeds to dawg pack ~ link to photo

// reset favs button


