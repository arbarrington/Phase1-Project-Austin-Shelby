let testImg = document.getElementById('testImg')

let currentDawgBreed

fetch(`https://dog.ceo/api/breeds/image/random`)
.then(resp => resp.json())
.then(data => {
    testImg.src = data.message
    getDawgBreed(data)
})

// this function takes in the data obj, selects the url, and then dissects it down to a dawg breed string in plain english
function getDawgBreed(data) {
    let dawgBreed = data.message.substring(30) // knocks off the http stuff that is always there
    let indexAtEndOfBreed = dawgBreed.indexOf('/',0) // figures out where the breed ends
    dawgBreed = dawgBreed.substring(0,indexAtEndOfBreed)
    console.log(dawgBreed)

    if (dawgBreed.includes('-')) {
        let indexOfDash = dawgBreed.indexOf('-')
        dawgBreed = `${dawgBreed.substring((indexOfDash+1))} ${dawgBreed.substring(0,indexOfDash)}` 
    }
    console.log(dawgBreed)
}
