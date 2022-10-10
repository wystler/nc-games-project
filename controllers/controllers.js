//  any models the controllers need to invoke
const {fetchReviews, fetchCategories} = require('../models/models.js')

const getCategories = (req, res) => {
    fetchCategories()
    .then((categories) => {
        res.status(200)
        .send(categories)
    })
}

const getReviews = (req, res) => {
    fetchReviews(req.params.review_id)
    .then((review) => {
        res.status(200)
        .send(review)
    })
}

//  any controllers needed by app
module.exports = {getCategories, getReviews}