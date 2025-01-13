const connection = require("../data/db");

// Funzione per ottenere tutti i film
function index(req, res) {
    let sql = `SELECT * FROM movies`;


    if (req.query.search) {
        sql += ` WHERE title LIKE '%${req.query.search}%' 
        OR director LIKE '%${req.query.search}%' 
        OR abstract LIKE '%${req.query.search}%' 
        OR genre LIKE '%${req.query.search}%'`
    }
    connection.query(sql, (err, movies) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }

        movies.forEach((film) => {
            film.image = `${process.env.BE_HOST}/img/movies_cover/${film.image}`
        });

        res.json(movies);
    });
}

// Funzione per ottenere i dettagli di un film e le sue recensioni
function show(req, res) {
    console.log("Film");

    const id = req.params.id;

    const movieQuery = `SELECT * FROM movies WHERE id = ?`;
    const reviewsQuery = `SELECT * FROM reviews WHERE movie_id = ?`;

    // Query per il film
    connection.query(movieQuery, [id], (err, movieResults) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }

        // Se il film non esiste, restituiamo un errore
        if (movieResults.length === 0) {
            return res.status(404).json({
                error: "Resource Not Found",
                message: "Movie not found",
            });
        }

        const movie = movieResults[0];

        // Recensioni
        connection.query(reviewsQuery, [id], (err, reviewResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }

            movie.reviews = reviewResults;

            res.json(movie);
        });
    });
}

module.exports = { index, show };
