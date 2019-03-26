const assert = require('assert')
const Postgres = require('../../../db/strategies/postgres')
const Context = require('../../../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HERO_REGISTER = {
  names: 'Maori',
  power: 'Bichinho'
}

const MOCK_HERO_UPDATE ={
  names: 'Junior',
  power: 'Turtle'
}

describe('Postgres Strategy', function() {
  this.timeout(Infinity)
  this.beforeAll(async function() {
    await context.connect()
    await context.create(MOCK_HERO_UPDATE)
  })
  it('PostgresSQL Connection', async function() {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it('To Register', async function() {
    const result = await context.create(MOCK_HERO_REGISTER)
    delete result.id 
    assert.deepEqual(result, MOCK_HERO_REGISTER)
  })

  it('Listing', async function() {
    const [result] = await context.read({ names: MOCK_HERO_REGISTER.names})
    delete result.id 
    assert.deepEqual(result, MOCK_HERO_REGISTER)
  })
  it('Update', async function() {
    const [itemUpdate] = await context.read({ names: MOCK_HERO_UPDATE.names})
    const newItem = {
      ...MOCK_HERO_REGISTER,
      names: 'Buchecha'
    }

    const [result] = await context.update(itemUpdate.id, newItem)
    const [itemUpdated] = await context.read({ id: itemUpdate.id })
    assert.deepEqual(result, 1)
    assert.deepEqual(itemUpdated.names, newItem.names)
  })
})
