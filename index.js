// fetch the featured dog

// guessing form

// favorite button

// reset scores

// reset favorites

fetch(`https://dog.ceo/api/breeds/image/randomages`)
.then(resp => resp.json())
.then(dawgs => {
    console.log(dawgs)
})