// fetch the featured dog

// guessing form

// favorite button

// reset scores

// reset favorites

let testImg = document.getElementById('test-img')

fetch(`https://dog.ceo/api/breeds/image/random`)
.then(resp => resp.json())
.then(dawgs => {
    console.log(dawgs)
    testImg.src = dawgs.message
})
