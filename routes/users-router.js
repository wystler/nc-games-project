const userRouter = require('express').Router()
const {getUsers, getUserByUsername} = require('../controllers/users-controllers.js')

userRouter.get('/', getUsers )
userRouter.get('/:username', getUserByUsername)

module.exports = userRouter