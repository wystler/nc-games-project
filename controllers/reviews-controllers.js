//  any models the controllers need to invoke
const {fetchReviewById} = require('../models/reviews-models.js')

const getReviewById = (req, res, next) => {
    fetchReviewById(req.params.review_id)
    .then((review) => {
        res.status(200)
        .send(review)
    })
    .catch(next)   
}

//  any controllers needed by app
module.exports = {getReviewById}