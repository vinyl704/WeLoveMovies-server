const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");
const mapProperties = require("../utils/map-properties")

const reduceMovies = mapProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
  });

async function list(req,res){
    const data = await service.list()
    res.json({data})
}

module.exports = {
    list
}