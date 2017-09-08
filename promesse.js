// promesse.js
// ---

const fetch = require('node-fetch')

async function dans3secondes() {
    const pokemon1 = await fetch('http://pokeapi.co/api/v2/pokemon/1')

    return pokemon1.json()
}

dans3secondes().then( console.log )