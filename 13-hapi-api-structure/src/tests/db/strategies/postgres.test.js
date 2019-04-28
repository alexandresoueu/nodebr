const assert = require('assert')
const Postgres = require('../../../db/strategies/postgres/postgres')
const HeroSchema = require('../../../db/strategies/postgres/schemas/heroesSchema')
const Context = require('../../../db/strategies/base/contextStrategy')

const MOCK_HERO_REGISTER = {
  names: 'Maori',
  power: 'Bichinho'
}

const MOCK_HERO_UPDATE ={
  names: 'Junior',
  power: 'Turtle'
}

let context = {}

describe('Postgres Strategy', function() {
  this.timeout(Infinity)
  this.beforeAll(async function() {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection, HeroSchema)
    context = new Context(new Postgres(connection, model))
    await context.delete()
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
  it('Remove to id', async function() {
    const [item] = await context.read({})
    const result = await context.delete(item.id)

    assert.deepEqual(result, 1)
  })
})
