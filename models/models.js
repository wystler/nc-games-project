const db = require("../db/connection.js");

const fetchCategories = () => {
  return db.query("SELECT * FROM categories").then((categories) => {
    return categories.rows;
  });
};

const fetchReviewById = (review_id) => {

  return db
    .query(
      `SELECT * FROM reviews 
        JOIN categories ON reviews.category=categories.slug 
        JOIN users ON reviews.owner=users.username
        WHERE review_id=$1`, [review_id]
    )

    .then((reviewData) => {
      if (reviewData.rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "sorry, no review with that id exists",
        });
      } else {
        const review = reviewData.rows[0];
        review.owner = review.name;
        review.category = review.description;
        delete review.slug;
        delete review.username;
        delete review.description;
        delete review.name;
        delete review.avatar_url;
        return review;
      }
    });
};

module.exports = { fetchReviewById, fetchCategories };
