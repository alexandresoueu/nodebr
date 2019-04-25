const assert = require('assert')
const MongoDB = require('../../../db/strategies/mongodb/mongodb')
const heroesSchema = require('../../../db/strategies/mongodb/schemas/heroesSchema')
const Context = require('../../../db/strategies/base/contextStrategy')

const MOCK_REGISTER_HEROES =  {
  names: 'O miranha',
  power: 'Spider Power'
}

const MOCK_HERO_DEFAULT = {
  names: `Et Bilu -- ${Date.now()}`,
  power: 'Buscar conhecimento'
}

const MOCK_HERO_UPDATE = {
  names: `Zaira -- ${Date.now()}`,
  power: 'Bit'
}

let MOCK_HERO_ID = ''

let context = {}

describe('MongoDB suit tests', function () {
  this.beforeAll(async () => {
    const connection = MongoDB.connect()
    context = new Context(new MongoDB(connection, heroesSchema))
    await context.create(MOCK_HERO_DEFAULT)
    const result = await context.create(MOCK_HERO_UPDATE)
    MOCK_HERO_ID = result._id
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

  it('Update data', async () => {
    const result = await context.update(MOCK_HERO_ID, {
      names: 'Kim Jung Un'
    })

    assert.deepEqual(result.nModified, 1)
  })

  it('Delete data', async () => {
    const result = await context.delete(MOCK_HERO_ID)

    assert.deepEqual(result.n, 1)
  })
})  
