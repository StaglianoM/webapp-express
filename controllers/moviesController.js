const connection = require("../data/db");

// Funzione per ottenere tutti i film
function index(req, res) {
    let sql =
        `SELECT movies.*, AVG(vote) AS avg_vote
    FROM movies
    JOIN reviews
    ON movies.id = reviews.movie_id
`


    if (req.query.search) {
        sql += ` WHERE title LIKE '%${req.query.search}%' 
        OR director LIKE '%${req.query.search}%' 
        OR abstract LIKE '%${req.query.search}%' 
        OR genre LIKE '%${req.query.search}%'`
    }

    sql += `GROUP BY movies.id`


    connection.query(sql, (err, movies) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: err.message });
        }

        movies.forEach((movies) => {
            movies.image = `${process.env.BE_HOST}/movies_cover/${movies.image}`;
        });

        res.json(movies);
    });
}

// Funzione per ottenere i dettagli di un film e le sue recensioni
function show(req, res) {
    console.log("Film");

    const id = req.params.id;

    const movieQuery = `SELECT movies.*, AVG(vote) AS avg_vote
    FROM movies
    JOIN reviews
    ON movies.id = reviews.movie_id 
    WHERE movies.id = ?
    GROUP BY movies.id`;

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

        const movies = movieResults[0];
        movies.image = `${process.env.BE_HOST}/img/movies_cover/${movies.image}`

        // Recensioni
        connection.query(reviewsQuery, [id], (err, reviewResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }

            movies.reviews = reviewResults;

            res.json(movies);
        });
    });
}

module.exports = { index, show };
