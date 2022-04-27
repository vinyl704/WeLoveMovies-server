const res = require("express/lib/response")
const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")


const addProp = mapProperties( {
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at"

});

const reduceProperties = require("../utils/reduce-properties")

const reduceProp = reduceProperties("critic_id", {
    // critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critic", null, "preferred_name"],
    surname: ["critic", null, "surname"],
    organization_name: ["critic", null, "organization_name"],
    //created_at: ["critic", null, "created_at"],
    //updated_at: ["critic", null, "updated_at"],
});

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
function read(movie_id) {
    return knex("movies").select("*").where({ movie_id:movie_id }).first()
}

function readReviews(movie_id) {

    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ movie_id })
        .then((row)=>row.map(addProp))

}

function playingIn(movieId) {
    return knex("movies")
        .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
        .join("theaters as t", "mt.theater_id", "t.theater_id")
        .select("t.*")
        .where({ is_showing: true, "mt.movie_id": movieId })
    //.groupBy("t.theater_id")
}

module.exports = {
    list, read, playingIn, readReviews
}