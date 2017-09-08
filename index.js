const path    = require('path')
const express = require('express')
const app     = express()

const Pokemon = require('./Pokemon.model')

/**
 * App configuration
 */

app.set('view engine', 'pug')
app.set('views', path.resolve('views'))
app.set('port', 3000)

/**
 * App middleware
 */

app.use(express.static(path.resolve('static')))
app.use(express.static(path.resolve('public')))

/**
 * App routes
 */

app.get('/', (request, response) => {

    Pokemon.find({}).lean().exec().then(pokemonsList => 
        response.render('index', {pokemonsList})
    );

});

/**
 * App start
 */

const connectToDatabase = require('./db');

connectToDatabase().then(() => {
    // Ici, la promesse a été résolue
    console.info('Connexion établie avec la base MongoDB')
    app.listen(app.get('port'), () => console.info(`Le serveur écoute sur le port ${app.get('port')}`))
}).catch(console.error)