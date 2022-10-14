const apiRouter = require('express').Router();
const userRouter = require('./users-router')
const reviewRouter = require('./reviews-router')
const commentRouter = require('./comments-router')
const getCategories = require('../controllers/categories-controllers.js')
const getPaths = require('../controllers/misc-controllers.js')

apiRouter.get('/', getPaths)
apiRouter.get('/categories', getCategories)

apiRouter.use('/reviews', reviewRouter)
apiRouter.use('/users', userRouter);
apiRouter.use('/comments', commentRouter)

module.exports = apiRouter;