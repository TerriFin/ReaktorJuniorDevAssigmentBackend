const statusRouter = require('express').Router()
const statusReader = require('../utils/readStatus')

let moduleData = {}
let moduleNames = []

const prepareThisFile = async () => {
  [moduleData, moduleNames] = await statusReader.giveAllStatuses()
}

prepareThisFile()

statusRouter.get('/index', (req, res) => {
  res.json(moduleNames)
})

statusRouter.get('/module/:moduleName', (req, res) => {
  res.json(moduleData[req.params.moduleName])
})

module.exports = statusRouter
