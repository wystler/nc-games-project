const categoryRouter = require('express').Router()
const {getCategories} = require('../controllers/categories-controllers.js')

categoryRouter.get('/', getCategories)

module.exports = categoryRouter