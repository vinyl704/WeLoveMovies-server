
const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

//used to add critic object as property later
const addProp = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"

});

//queries database returns all movie records
//if 'is_showing' is truthy, only movies
//where the is_showing field has a value of true
function list(is_showing) {
    return is_showing
        ? knex("movies as m").distinct("m.title")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .join("theaters as t", "mt.theater_id", "t.theater_id")
            .select("m.*")
            .groupBy("t.theater_id", "m.movie_id")
            .where({ is_showing: true })
        : knex("movies").select("*")
}

//query returns single movie record
function read(movie_id) {
    return knex("movies")
    .select("*")
    .where({ movie_id: movie_id })
    .first()
}

//query returns all review records and
//then inserts the critic proprty with an
//its value set to an object using the fields
//from the critics table.
async function readReviews(movie_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ movie_id })
        .then((row) => row.map(addProp))
}

//query returns records of theaters that
//are actively playing the movie specified
//by the movieId
function playingIn(movieId) {
    return knex("movies")
        .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*")
        .where({ is_showing: true, "mt.movie_id": movieId })
}

module.exports = {
    list,
    read,
    playingIn,
    readReviews
}