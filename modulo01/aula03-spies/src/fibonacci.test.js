// input: 3
// 0, 1, 1
// input: 5
// 0,1,1,2,3
const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci');
const sinon = createSandbox()
const assert = require('assert')



  ; (async () => {
    {
      const fibonacci = new Fibonacci();
      const spy = sinon.spy(fibonacci, fibonacci.execute.name)
      const call = [...fibonacci.execute(5)]
      const expectedCallCount = 6
      assert.strictEqual(spy.callCount, expectedCallCount)
      const { args } = spy.getCall(2)
      const expectedParams = [3, 1, 2]
      assert.deepStrictEqual(args, expectedParams, "os parametros não são iguais!")
    }

    {
      const fibonacci = new Fibonacci();

      const results = [...fibonacci.execute(3)]

      const expectedResults = [0, 1, 1]

      assert.deepStrictEqual(results, expectedResults, 'o resultado não é o esperado!')
    }
  })()