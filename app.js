//  express setup
const express = require('express')
const app = express()
app.use(express.json())

//  any controllers the app needs to invoke
const {} = require('./controllers/controllers.js')




//  so testing can use them
module.exports = app