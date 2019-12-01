const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('module names are returned as json', async () => {
  await api
    .get('/api')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('module names are returned alphabetically', async () => {
  const response = await api.get('/api')

  expect(response.body[0].charAt(0)).toBe('a')
  expect(response.body[response.body.length - 1].charAt(0)).not.toBe('a')
})

test('module data is returned as json', async () => {
  await api
    .get('/api/python')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('module data contains all required data', async () => {
  const response = await api.get('/api/python')

  expect(response.body.reverseDependencies).not.toBeUndefined()
  expect(response.body.dependencies).not.toBeUndefined()
  expect(response.body.description).not.toBeUndefined()
})
