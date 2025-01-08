const connection = require('../data/db')

//elenco dei film
function index(req, res) {
    res.json({
        message: 'index movies'
    })
}

//elenco del singolo film e recensione
function show(req, res) {
    res.json({
        message: 'show movies'
    })
}


module.exports = { index, show }
