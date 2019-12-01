const statusRouter = require('express').Router()
const statusReader = require('../utils/readStatus')

// Return an array of just module names, sorted alphabetically
statusRouter.get('/', async (req, res) => {
  const [moduleData, moduleNames] = await statusReader.giveAllStatuses()
  res.json(moduleNames)
})

// Return the required module data
statusRouter.get('/:moduleName', async (req, res) => {
  const [moduleData, moduleNames] = await statusReader.giveAllStatuses()
  res.json(moduleData[req.params.moduleName])
})

module.exports = statusRouter
