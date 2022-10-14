const userRouter = require('express').Router()
const {getUsers} = require('../controllers/users-controllers.js')

userRouter.get('/', getUsers )

module.exports = userRouter