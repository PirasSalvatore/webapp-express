const connection = require('../data/db')

const url_base_image = "/image/"

//index (read)
function index(req, res) {

    const sql = 'SELECT * FROM movies'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })

        res.json(results.map(movie => {

            const url_image = `${url_base_image}${movie.image}`
            movie.image = url_image
            return movie
        }))
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

        //console.log(movie)


        connection.query(sqlReviews, [movie.id], (err, reviews) => {
            if (err) return res.status(500).json({ error: 'reviews non found' })

            movie.reviews = reviews

            const url_image = `${url_base_image}${movie.image}`
            movie.image = url_image

            res.json(movie)
        })

    })
}

//store (create)
function store(req, res) {

    const id = Number(req.params.id)

    const review = req.body

    const { name, vote, text } = review


    const sql = `INSERT INTO movies_db.reviews (movie_id, name, vote, text, created_at, updated_at) 
           VALUES (?, ?, ?, ?, NOW(), NOW());`

    if (!name || !vote || !text) {
        return res.status(400).json({ error: 'Missing required fields' })
    }

    connection.query(sql, [id, name, vote, text], (err, results) => {

        if (err) return res.status(500).json({ error: 'Database query failed' })

        res.status(201).json({ message: 'Review created successfully', reviewId: results.insertId })
    })

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