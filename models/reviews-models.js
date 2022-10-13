const { query } = require("../db/connection.js");
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

const fetchReviews = (sort='created_at', order='desc', category) => {

  const validSortQueries = ["owner", "title", "review_id", "category", "review_img_url", "created_at", "votes", "designer", "comment_count"]
  const validOrderQueries = ["asc", "desc"]
  const validCategories = ["euro game", "social deduction", "dexterity", "children's games", undefined]

    if(!validCategories.includes(category)) {
      return Promise
      .reject({status:400, msg:"Invalid sort query type"})
    }

    if (!validSortQueries.includes(sort)) {
      return Promise
      .reject({status:400, msg:"Invalid sort query type"})
    }

    if (!validOrderQueries.includes(order)) {
      return Promise
      .reject({status:400, msg:"Invalid order query type"})
  }

  let queryString = 
  `SELECT reviews.*,
  COUNT(comments.comment_id) ::INT AS comment_count
  FROM reviews
  LEFT JOIN comments ON reviews.review_id = comments.review_id`

  if(category!=undefined) queryString+=` WHERE category='${category}'`

  queryString +=`
  GROUP BY reviews.review_id
  ORDER BY ${sort} ${order}`
  

  return db
    .query( queryString )
    .then((reviews) => {
        return reviews.rows
    }
  )
}

module.exports = { fetchReviews, fetchReviewById, updateReviewById };
