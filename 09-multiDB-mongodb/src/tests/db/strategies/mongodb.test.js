const assert = require('assert')
const MongoDB = require('../../../db/strategies/mongodb')
const Context = require('../../../db/strategies/base/contextStrategy')

const context = new Context(new MongoDB())

describe('MongoDB suit tests', function () {
  this.beforeAll(async () => {
    await context.connect()
  })
  it('Verify the connection', async () => {
    const result = await context.isConnected()
    const expected = 'Connected'

    assert.deepEqual(result, expected)
  })
})  
