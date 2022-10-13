const express = require('express')
const app = express()
app.use(express.json())

//  any controllers the app needs to invoke
const {getReviewById, patchReviewById, getReviews} = require('./controllers/reviews-controllers.js')
const {getCommentsByReviewId, postCommentByReviewId} = require('./controllers/comments-controllers.js')
const {getCategories} = require('./controllers/categories-controllers.js')
const {getUsers} = require('./controllers/users-controllers.js')

///////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/categories', getCategories)

app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id', getReviewById)

app.get('/api/reviews/:review_id/comments', getCommentsByReviewId)

app.get('/api/users', getUsers)

app.patch('/api/reviews/:review_id', patchReviewById)

app.post('/api/reviews/:review_id/comments', postCommentByReviewId)

app.delete('/api/comments/:comment_id', deleteComment)

///////////////////////////////////////////////////////////////////////////////////////////////////////

//  if the path isnt in the list of valid ones above
app.all('/*', (req, res) => {
    res.status(404).send({msg:"Route not found"})
})

//  if there's some other error code and message passed back
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
});

//  if the database returns an error code
app.use((err, req, res, next) => {
  if (err.code === '22P02') {
  res.status(400).send({msg:"request has a value of the incorrect datatype"})
  }
  if (err.code === '23502') {
  res.status(400).send({msg:"body of request is not in an acceptable form"})
  } 
  if (err.code === '23503') {
  res.status(404).send({msg:"sorry, no user with that id exists"})
  } else {
    next(err)
  }
})

//  otherwise this will get invoked as the last resort
app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
});


module.exports = app