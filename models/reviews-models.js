const db = require("../db/connection.js");

const fetchReviewById = (review_id) => {

  return db
    .query(
      `SELECT reviews.*, 
      COUNT(comments.comment_id) ::INT AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      WHERE reviews.review_id=$1
      GROUP BY reviews.review_id`, [review_id]
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

const fetchReviews = () => {
  return db
    .query(
      `SELECT reviews.*, 
      COUNT(comments.comment_id) ::INT AS comment_count
      FROM reviews
      LEFT JOIN comments ON reviews.review_id = comments.review_id
      GROUP BY reviews.review_id
      ORDER BY created_at DESC`
      
    )
    .then((reviews) => {
        return reviews.rows
    }
  )
}

module.exports = { fetchReviews, fetchReviewById, updateReviewById };
