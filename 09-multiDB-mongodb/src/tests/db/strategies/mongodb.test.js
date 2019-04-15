const assert = require('assert')
const MongoDB = require('../../../db/strategies/mongodb')
const Context = require('../../../db/strategies/base/contextStrategy')

const MOCK_REGISTER_HEROES =  {
  names: 'O miranha',
  power: 'Spider Power'
}

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

  it('Register data', async () => {
    const { names, power } = await context.create(MOCK_REGISTER_HEROES)

    assert.deepEqual({ names, power }, MOCK_REGISTER_HEROES)
  })
})  
