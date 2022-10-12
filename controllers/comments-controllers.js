const {publishCommentByReviewId, fetchCommentsByReviewId} = require('../models/comments-models')

const getCommentsByReviewId = (req, res, next) => {
    fetchCommentsByReviewId(req.params.review_id)
    .then((comments) => {
        res.status(200)
        .send(comments)
    })
    .catch(next)
}

const postCommentByReviewId = (req, res, next) => {
    publishCommentByReviewId(req.body, req.params.review_id)
}
module.exports = {postCommentByReviewId, getCommentsByReviewId}