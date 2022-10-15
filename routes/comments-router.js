const commentRouter = require('express').Router()
const {deleteComment, patchComment} = require('../controllers/comments-controllers.js')

commentRouter.delete('/:comment_id', deleteComment)
commentRouter.patch('/:comment_id', patchComment)

module.exports = commentRouter
