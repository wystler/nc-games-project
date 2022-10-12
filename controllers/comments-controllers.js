const fetchCommentsByReviewId = require('../models/comments.models')

const getCommentsByReviewId = (req, res, next) => {
    fetchCommentsByReviewId(req.params)
    .then((comments) => {
        res.status(200)
        .send(comments)
    })
    .catch(next)
}

module.exports = {getCommentsByReviewId}