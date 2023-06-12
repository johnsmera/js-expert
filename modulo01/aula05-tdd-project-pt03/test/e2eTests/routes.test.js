const supertest = require('supertest')
const { describe, it } = require('mocha')
const assert = require('assert')

const mocks = {
  carCategory: require('../mocks/valid-carCategory.json'),
  customer: require('../mocks/valid-customer.json')
}

describe('Routes: Transaction', () => {
  let app

  before((done) => {
    app = require('../../src/routes')
    app.once('listening', done)
  })

  after((done) => {
    app.close(done)
  }, [])

  it('should return a transaction receipt', async () => {
    await supertest(app)
      .post('/transactions')
      .send({
        customer: mocks.customer,
        carCategory: mocks.carCategory,
        numberOfDays: 10,
      })
      .expect(200)
      .then(res => {
        const { transaction } = JSON.parse(res.text)

        const result = {
          amount: transaction.amount,
        }

        const expected = {
          amount: "R$ 437,84",
        }

        console.log(result.amount === expected.amount) // false

        assert.strictEqual(result.amount, expected.amount)
      })
  })
})


