const categoryRouter = require('express').Router()
const {getCategories} = require('../controllers/categories-controllers.js')

categoryRouter.get('/categories', getCategories)

module.exports = categoryRouter