const mongoose = require('mongoose')

const DATABASE_NAME = 'pokemons'
const DATABASE_PORT = 27017

mongoose.connect(`mongodb://localhost:${DATABASE_PORT}/${DATABASE_NAME}`, {useMongoClient:true})

// Récupération de l'objet 'connection' de mongoose, grâce auquel on pourra savoir l'état de la connexion
const db = mongoose.connection

/*
    Export d'une fonction qui renvoie une promesse JavaScript :
    Cette promesse sera dite "rejetée" si un événement `error` se produit sur l'objet `db` => connexion à la base Mongo échouée
    Sinon, cette promesse sera "résolue" si un événement `open` se produit sur l'objet `db` => connexion à la base Mongo OK
*/
module.exports = function() {
	return new Promise( (resolve, reject) => {
		db.on('error', () => reject(new Error(`Impossible de se connecter à la base MongoDB "${DATABASE_NAME}"`)))
		db.on('open', () => resolve(db))
    } )
}