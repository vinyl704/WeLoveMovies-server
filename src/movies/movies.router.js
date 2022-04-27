const router = require("express").Router({mergeParams:true});
const controller = require("./movies.controller")
const reviewRouter = require("../reviews/reviews.router")
const methodNotAllowed = require("../errors/methodNotAllowed")


//router.use("/:movieId/reviews",reviewRouter)

router.route("/?is_showing")
.get(controller.list)
.all(methodNotAllowed)

router
.route("/:movieId/theaters")
.get(controller.playingIn)
.all(methodNotAllowed)

router
.route("/:movieId/reviews")
.get(controller.readReviews)
.all(methodNotAllowed)

router
.route("/:movieId")
.get(controller.read)
.all(methodNotAllowed)

router
.route("/")
.get(controller.list)
.all(methodNotAllowed)

module.exports = router;