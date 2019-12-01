const express = require('express')
const cors = require('cors')
const statusRouter = require('./controllers/status')

const app = express()

app.use(cors())
app.use('/', statusRouter)

module.exports = app
