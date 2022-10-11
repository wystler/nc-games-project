//  any models the controllers need to invoke
const {fetchReviewById, fetchCategories} = require('../models/models.js')

const getCategories = (req, res) => {
    fetchCategories()
    .then((categories) => {
        res.status(200)
        .send(categories)
    })
}

const getReviewById = (req, res, next) => {
    fetchReviewById(req.params.review_id)
    .then((review) => {
        res.status(200)
        .send(review)
    })
    .catch(next)   
}

//  any controllers needed by app
module.exports = {getCategories, getReviewById}