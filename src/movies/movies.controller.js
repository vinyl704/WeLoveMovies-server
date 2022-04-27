const service = require('./movies.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

//lists all movies by passing the query information into the 'list' service
async function list(req, res) {
    res.json({ data: await service.list(req.query.is_showing) })
}

//middleware to check database for an existing match to the movie id
//if so, movie is saved to the response for later use
async function movieExists(req, res, next) {
    const movie = await service.read(req.params.movieId)
    if (movie) {
        res.locals.movie = await movie
        return next()
    }
    return next({ status: 404, message: "Movie does not exist" })
}

//gets movieId from movie object(stored in res.locals) and returns all theaters that are currently showing
//a particular movie by passing it into the playingIn service.
async function playingIn(req, res) {
    const movieId = res.locals.movie.movie_id
    res.json({ data: await service.playingIn(movieId) })
}

//gets movieId from movie object(stored in res.locals) and returns
//reviews for a particular movie by passing it into the readReviews service.
async function readReviews(req, res) {
    const movieId = res.locals.movie.movie_id
    res.json({ data: await service.readReviews(movieId) })
}

//returns movie object
function read(req, res) {
    res.json({ data: res.locals.movie })
}
module.exports = {

    readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    playingIn: [asyncErrorBoundary(movieExists), asyncErrorBoundary(playingIn)]
}