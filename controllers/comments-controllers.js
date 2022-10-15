const {updateCommentByCommentId, removeComment, publishCommentByReviewId, fetchCommentsByReviewId} = require('../models/comments-models')

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
    .then((newComment) => {
        res.status(201)
        .send(newComment)
    })
    .catch(next)
}

const deleteComment = (req, res, next) => {
    removeComment(req.params.comment_id)
    .then(() => {
        res.status(204)
        .send()
    })
    .catch(next)
}

const patchComment = (req, res, next) => {
    updateCommentByCommentId(req.params.comment_id, req.body)
    .then((patchedComment) => {
        res.status(200)
        .send(patchedComment)
    })
}

module.exports = {patchComment, deleteComment, postCommentByReviewId, getCommentsByReviewId}