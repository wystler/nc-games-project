const { patch } = require("../app.js");
const db = require("../db/connection.js");

const fetchReviewById = (review_id) => {

  return db
    .query(
      `SELECT * FROM reviews
      WHERE review_id=$1`, [review_id]
    )
    .then((reviewData) => {
      if (reviewData.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "sorry, no review with that id exists",
        });
      } else {
        return reviewData.rows[0];
      }
    });
};

const updateReviewById = (review_id, changeVotes) => {

}

module.exports = { fetchReviewById, updateReviewById };
