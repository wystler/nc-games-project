//  any models the controllers need to invoke
const {fetchReviewById, updateReviewById} = require('../models/reviews-models.js')

const getReviewById = (req, res, next) => {
    fetchReviewById(req.params.review_id)
    .then((review) => {
        res.status(200)
        .send(review)
    })
    .catch(next)   
}

const patchReviewById = (req, res, next) => {
    const review_id = req.params.review_id
    const patch = req.body
    updateReviewById(review_id, patch)
    .then((patchedReview) => {
        res.status(200)
        .send(patchedReview)
    })
    .catch(next)
}

//  any controllers needed by app
module.exports = {patchReviewById, getReviewById}