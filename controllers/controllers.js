//  any models the controllers need to invoke
const {fetchCategories} = require('../models/models.js')

const getCategories = (req, res) => {
    fetchCategories()
    .then((categories) => {
        res.status(200)
        .send(categories)
    })
}

//  any controllers needed by app
module.exports = {getCategories}