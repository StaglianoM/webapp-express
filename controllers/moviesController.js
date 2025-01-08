const connection = require('../data/db')



//elenco dei film
function index(req, res) {
    const sql = `SELECT * FROM movies`


    connection.query(sql, (err, movies) => {
        // console.log(err)
        if (err) return res.status(500).json({ message: err.message })
        // console.log(movies)

        res.json({
            message: 'index movies'
        })

    })
}



//elenco del singolo film e recensione
function show(req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            error: 'ID non valido'
        });
    }

    const sql = `SELECT * FROM movies WHERE id = ?`;

    connection.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Errore durante la query:', err);
            return res.status(500).json({
                error: 'Errore del server'
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Film non trovato'
            });
        }
    });
    // Restituisce il primo risultato come oggetto JSON
    res.json(results[0]);
}


module.exports = { index, show }
