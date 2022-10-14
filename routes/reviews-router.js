const reviewRouter = require('express').Router()
const {getReviewById, patchReviewById, getReviews} = require('../controllers/reviews-controllers.js')
const {getCommentsByReviewId, postCommentByReviewId} = require('../controllers/comments-controllers.js')

reviewRouter.get('/', getReviews )
reviewRouter.get('/:review_id', getReviewById)
reviewRouter.get('/:review_id/comments', getCommentsByReviewId)
reviewRouter.patch('/:review_id', patchReviewById)
reviewRouter.post('/:review_id/comments', postCommentByReviewId)

module.exports = reviewRouter