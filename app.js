const express = require('express')
const app = express()
app.use(express.json())

//  any controllers the app needs to invoke
const {getReviewById} = require('./controllers/reviews-controllers.js')
const {getCategories} = require('./controllers/categories-controllers.js')
const {} = require('./controllers/users-controllers.js')

///////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReviewById)


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
  res.status(400).send({msg:"request must be a number"})
  } else {
    next(err)
  }
})

//  otherwise this will get invoked as the last resort
app.use((err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error' });
});


module.exports = app