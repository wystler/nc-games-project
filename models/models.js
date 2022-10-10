const db = require('../db/connection.js')

const fetchCategories = () => {
    return db.query('SELECT * FROM categories')
    .then((categories) => { return categories.rows })
}

const fetchReviews = (review_id) => {
    let queryString = `SELECT * FROM reviews`
    if (review_id) queryString += ` WHERE review_id=${review_id}`
    return db.query(queryString)
    .then((reviews) => {return reviews.rows[0]})
}


module.exports = {fetchReviews, fetchCategories}