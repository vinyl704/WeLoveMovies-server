const service = require('./movies.service')
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
async function list(req,res){
    res.json({data:await service.list(req.query.is_showing)})
}

async function movieExists(req,res,next){
const movie = await service.read(req.params.movieId)
if(movie){
    res.locals.movie = await movie
    return next()
}
 return next({status:404,message:"Movie does not exist"})
}
async function playingIn(req,res){
    const {movieId} = req.params
    res.json({data:await service.playingIn(movieId)})
}

async function readReviews(req,res){
    res.json({data:await service.readReviews(req.params.movieId)})
}

function read(req,res){
    res.json({data:res.locals.movie})
}
module.exports = {
    
    readReviews:[asyncErrorBoundary(movieExists),asyncErrorBoundary(readReviews)],list:asyncErrorBoundary(list),read:[asyncErrorBoundary(movieExists),read],playingIn:[asyncErrorBoundary(movieExists),asyncErrorBoundary(playingIn)]
}