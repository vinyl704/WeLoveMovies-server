const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const service = require("./reviews.service")

//middleware to check database for an existing match to the reviewId
//if so, review is saved to the response for later use
async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    return next({ status: 404, message: "Review cannot be found" })
}

//updates single record and returns updated record
async function update(req, res) {
    const reviewId = res.locals.review.review_id
    
    //request body data spread to update record
    const edited = {
        ...req.body.data,
        review_id: reviewId
    }
    await service.update(edited) //update record
    const result = await service.read(reviewId) //edited record returned to variable
    res.json({ data: result })
}

async function destroy(req, res) {
    await service.delete(res.locals.review.review_id)
    res.sendStatus(204)
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
};