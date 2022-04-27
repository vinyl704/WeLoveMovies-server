if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors")
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router")
const reviewsRouter = require("./reviews/reviews.router")


app.use(express.json())
app.use(cors())

app.use("/movies",moviesRouter)
app.use("/theaters",theatersRouter)
app.use("/reviews", reviewsRouter)


app.use((req,res,next)=>{
    next({status:404,message:"Route Not Found"})
})

app.use((err,req,res,next)=>{
    const {status=500, message="Something wrong"} = err;
    res.status(status).json({error:message})
})
module.exports = app;
