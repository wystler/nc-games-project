const db = require("../db/connection.js");
const checkExists = require('../utils.js')

const fetchCommentsByReviewId = async (review_id) => {

    await checkExists('reviews', 'review_id', review_id)

    return db
    .query(
        `SELECT * FROM comments
        WHERE review_id=$1
        ORDER BY created_at DESC`, [review_id]
    )
    .then((comments) => {
        if(comments.rows.length === 0) {
            return Promise.reject({
                status:200,
                msg: "sorry, there are no comments for that review"
            })
        } else {
            return comments.rows
        }
    })
}

const publishCommentByReviewId = async (comment, review_id) => {

    await checkExists('reviews', 'review_id', review_id)

    return db
    .query(
        `INSERT INTO comments (body, author, review_id)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [comment.body, comment.username, review_id]
    ).then((newComment) => {
        return newComment.rows[0]
    })
}

const removeComment = (comment_id) => {
    
    return db
    .query(
        `DELETE FROM comments
        WHERE comment_id=$1
        RETURNING *`,
        [comment_id]
    )
}

module.exports = {removeComment, publishCommentByReviewId, fetchCommentsByReviewId}