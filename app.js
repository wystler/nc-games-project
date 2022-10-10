//  express setup
const express = require('express')
const app = express()
app.use(express.json())

//  any controllers the app needs to invoke
const {getCategories} = require('./controllers/controllers.js')

///////////////////////////////////////////////////////////////////////////////////////////////////////


app.get('/api/categories', getCategories)


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

//  otherwise this will get invoked as the last resort
app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
  });

//  so testing can use them
module.exports = app