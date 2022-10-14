const {fetchCategories} = require('../models/categories-models.js')

const getCategories = (req, res, next) => {
    fetchCategories()
    .then((categories) => {
        res.status(200)
        .send(categories)
    })
    .catch(next)
}

module.exports = {getCategories}