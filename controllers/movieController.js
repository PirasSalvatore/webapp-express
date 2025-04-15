const connection = require('../data/db')

//index (read)
function index(req, res) {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })

        res.json(results)
    })
}

//show (read)
function show(req, res) {

    const id = Number(req.params.id)

    const sql = `SELECT * FROM movies WHERE id = ? `

    const sqlReviews = `
    SELECT *
    FROM reviews
    WHERE reviews.movie_id = ?`


    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed 1' })

        if (results.length === 0) return res.status(404).json({ message: 'movie not found' })

        const movie = results[0]

        console.log(movie);


        connection.query(sqlReviews, [movie.id], (err, reviews) => {
            if (err) return res.status(500).json({ error: 'reviews non found' })

            movie.reviews = reviews

            res.json(movie)
        })

    })
}

//store (create)
function store(req, res) {

}

//update (update)
function update(req, res) {

}

//partial update (modify)
function modify(req, res) {

}

//delete (delete)
function destroy(req, res) {

    const id = Number(req.params.id)

    const sql = `DELETE FROM movies WHERE id = ?`

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })

        console.log('delete complete');

        res.sendStatus(204)
    })
}

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}