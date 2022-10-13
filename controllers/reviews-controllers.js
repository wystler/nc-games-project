//  any models the controllers need to invoke
const {fetchReviews, fetchReviewById, updateReviewById} = require('../models/reviews-models.js')

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

const getReviews = (req, res, next) => {
    const validQueries = ["sort_by", "order"]
    for (const prop in req.query) {
        if (!validQueries.includes(prop)) {
            res.status(400)
            .send({msg:"Invalid query type"})
        }
    }
    fetchReviews(req.query.sort_by, req.query.order)
    .then((reviews) => {
        res.status(200)
        .send(reviews)
    })
    .catch(next)
}

//  any controllers needed by app
module.exports = {getReviews, patchReviewById, getReviewById}