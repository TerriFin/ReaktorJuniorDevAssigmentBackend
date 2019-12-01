const express = require('express')
const cors = require('cors')
const statusRouter = require('./controllers/status')

// Create the express app
const app = express()

// Allow calls from frontend
app.use(cors())
// Use a router we defined in controllers to handle / calls
app.use('/api', statusRouter)

module.exports = app
