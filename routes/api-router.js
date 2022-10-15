const apiRouter = require('express').Router();
const userRouter = require('./users-router')
const reviewRouter = require('./reviews-router')
const commentRouter = require('./comments-router')
const getPaths = require('../controllers/misc-controllers.js');
const categoryRouter = require('./categories-router');

apiRouter.get('/', getPaths)
apiRouter.use('/categories', categoryRouter)
apiRouter.use('/reviews', reviewRouter)
apiRouter.use('/users', userRouter);
apiRouter.use('/comments', commentRouter)

module.exports = apiRouter;