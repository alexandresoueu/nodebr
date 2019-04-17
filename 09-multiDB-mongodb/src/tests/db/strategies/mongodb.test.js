const assert = require('assert')
const MongoDB = require('../../../db/strategies/mongodb')
const Context = require('../../../db/strategies/base/contextStrategy')

const MOCK_REGISTER_HEROES =  {
  names: 'O miranha',
  power: 'Spider Power'
}

const MOCK_HERO_DEFAULT = {
  names: `Et Bilu -- ${Date.now()}`,
  power: 'Buscar conhecimento'
}

const context = new Context(new MongoDB())

describe('MongoDB suit tests', function () {
  this.beforeAll(async () => {
    await context.connect()
    await context.create(MOCK_HERO_DEFAULT)
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

  it('Read and show data', async () => {
    const [{ names, power }] = await context.read({ names: MOCK_HERO_DEFAULT.names })
    const result = {
      names, power,
    }

    assert.deepEqual(result, MOCK_HERO_DEFAULT)
  })
})  
