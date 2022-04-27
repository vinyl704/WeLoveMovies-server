const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

const addProp = mapProperties({
    //critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    //created_at: "critic.created_at",
    //updated_at: "critic.updated_at"
});

const reduceProperties = require("../utils/reduce-properties")

const reduceProp = reduceProperties("critic_id", {
    // critic_id: ["critic", null, "critic_id"],
    preferred_name: ["critics", null, "preferred_name"],
    surname: ["critics", null, "surname"],
    organization_name: ["critics", null, "organization_name"],
    //created_at: ["critic", null, "created_at"],
    //updated_at: ["critic", null, "updated_at"],
});

function list(m_id) {
    return m_id
        ? knex("reviews as r")
            .join("critics as critic", "critic.critic_id", "r.critic_id")
            .select("r.*").where({ movie_id: m_id })
            .groupBy("reviewsList")
            .then(addProp)
        : knex("reviews as r").select("r.*")
}

function read(review_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*","c.*")
        .where({ review_id:review_id })
        .first()
        .then(addProp)
}

function update(review) {
    console.log(review)
    return knex("reviews")
        .select("*")
        .where({ review_id: review.review_id })
        .update(review, "*")
       
}

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del()
}

module.exports = {
    list, read, delete:destroy, update
}