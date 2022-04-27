const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

//used to add critic object as property later
const addProp = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
});

//returns single record from reviews table
function read(review_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("r.*", "c.*")
        .where({ review_id: review_id })
        .first()
        .then(addProp)
}

//update single record from reviews table
function update(review) {
    console.log(review)
    return knex("reviews")
        .select("*")
        .where({ review_id: review.review_id })
        .update(review, "*")

}

//delete single record from reviews table
function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del()
}

module.exports = {
    read, delete: destroy, update
}
