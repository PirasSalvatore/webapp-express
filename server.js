const express = require('express')
const app = express()
const port = 3000

//opening the server
app.listen(port, () => {
    console.log(`Server app listening on port http://localhost:${port}`)
})

//importing the rout
const movieRouter = require('./router/movieRouter')

//importing the middelware
const serverError = require('./middelware/serverError')

const notFound = require('./middelware/notFound')

//importing and using the cors
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173'
}))

app.use(express.json());

//using static foulder
app.use(express.static('public'))

//using the default router
app.get('/', (req, res) => {
    res.send("welcome to blog server")
})

//usging the router
app.use("/api/v1/movies", movieRouter)

//using the middelware
app.use(serverError)

app.use(notFound)