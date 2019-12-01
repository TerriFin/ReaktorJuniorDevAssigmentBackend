const http = require('http')
const app = require('./app')

// Create the server and register our express middleware to handle requests
const server = http.createServer(app)

const port = 3001

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
