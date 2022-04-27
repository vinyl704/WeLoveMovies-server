const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reviews.service")
/*
async function list(req,res){
    const {movieId} = req.params
    res.json({data:await service.list(movieId)})
}
*/

async function read(req,res,next){
    const {reviewId} = req.params
    //console.log(reviewId)
    res.json({data:await service.read(reviewId)})
}

async function reviewExists(req,res,next){
    const review = await service.read(req.params.reviewId)
    if(review){
        res.locals.review = review
        return next()
    }
    return next({status: 404,message:"Review cannot be found"})
    }

async function update(req,res){
    const reviewId = res.locals.review.review_id
    console.log(reviewId)
    const edited = {
        ...req.body.data,
        review_id:reviewId
    }
    await service.update(edited)
    const result = await service.read(edited.review_id)
    res.json({data:result})
}

async function destroy(req,res){
    await service.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

module.exports = {
    
    
    update:[asyncErrorBoundary(reviewExists),asyncErrorBoundary(update)],
    delete:[asyncErrorBoundary(reviewExists),asyncErrorBoundary(destroy)]};