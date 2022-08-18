// fetch the featured dog

// guessing form

// favorite button

// reset scores

// reset favorites

let testImg = document.getElementById('testImg')

let currentDawgBreed

fetch(`https://dog.ceo/api/breeds/image/random`)
.then(resp => resp.json())
.then(dawgs => {
    //console.log(dawgs)
    testImg.src = dawgs.message
    getDawgBreed(dawgs)
})

function getDawgBreed(dawgs) {
    let dawgBreed = []
    rawURLArray = dawgs.message.substring(30).split('')
    rawURLArray.forEach(char => {
        while (char != '/') {
            dawgBreed.push(char)
        } 
    })
    console.log(dawgBreed)
}
