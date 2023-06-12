const { describe, it, before, after } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('API Suite Test', () => {
  let app

  before((done) => {
    app = require('./api')
    app.once('listening', done)
  })

  after((done) => {
    app.close(done)
  }, [])

  describe('/contact:get', () => {
    it('should request contact page and return HTTP Status 200', async () => {
      const response = await supertest(app).get('/contact').expect(200)

      assert.strictEqual(response.text, 'contact us page')
    })
  })

  describe('/login:post', () => {
    it('should request the login and return HTTP Status 200', async () => {
      const response = await supertest(app).post('/login').send({
        username: 'JohnSmera',
        password: '123'
      }).expect(200)

      assert.strictEqual(response.text, 'Logged!')
    })

    it('should request the login and return HTTP Status 401', async () => {
      const response = await supertest(app).post('/login').send({
        username: 'JohnSmera',
        password: '12'
      }).expect(401)

      assert.deepStrictEqual(response.text, 'Logging failed!')
    })
  })

  describe('default page', () => {
    it('should request nonexistent route and return HTTP Status 404 ', async () => {
      const response = await supertest(app).get('/nonexistent').expect(404)

      assert.strictEqual(response.text, 'Not Found!')
    })
  })
})