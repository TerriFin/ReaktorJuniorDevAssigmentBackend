const express = require('express')
const statusRouter = require('./controllers/status')

const app = express()

app.use('/', statusRouter)

module.exports = app
