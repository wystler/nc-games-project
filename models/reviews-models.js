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
  return db
    .query(
      `UPDATE reviews SET votes= votes+$2 WHERE review_id=$1 RETURNING *`, [review_id, changeVotes.inc_votes]
      )
    .then((updatedReview) => {
      if (updatedReview.rows.length === 0) {
        return Promise.reject({
          status:404,
          msg: "sorry, no review with that id exists",
        })
      } else {
      return updatedReview.rows[0]
    }
  })
}

module.exports = { fetchReviewById, updateReviewById };
