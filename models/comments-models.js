const db = require("../db/connection.js");

const fetchCommentsByReviewId = (review_id) => {
    return db
    .query(
        `SELECT * FROM comments
        WHERE review_id=$1
        ORDER BY created_at DESC`, [review_id]
    )
    .then((comments) => {
        if(comments.rows.length === 0) {
            return Promise.reject({
                status:404,
                msg: "sorry, there are no comments for that review, or there is no review with that id"
            })
        } else {
            return comments.rows
        }
    })
}

const publishCommentByReviewId = () => {
    
}

module.exports = {publishCommentByReviewId, fetchCommentsByReviewId}