const {
  deepEqual,
  ok
} = require('assert')

const database = require('./database')

const DEFAULT_ITEM_REGISTER = {
  name: 'Flash',
  power: 'Speed',
  id: 1
}

const DEFAULT_ITEM_UPDATE = {
  name: 'Batman',
  power: 'Money',
  id: 2
}

describe('Handler of Heroes', () => {
  beforeEach(async () => {
    await database.remove()
    await database.register(DEFAULT_ITEM_REGISTER)
    await database.register(DEFAULT_ITEM_UPDATE)
  })

  it('Should search a Hero using file', async () => {
    const expected = DEFAULT_ITEM_REGISTER
    const [result] = await database.list(expected.id)

    deepEqual(result, expected)
  })

  it('Should register a Hero, using files', async () => {
    const expected = DEFAULT_ITEM_REGISTER
    //const result = await database.register(DEFAULT_ITEM_REGISTER)
    const [actual] = await database.list(DEFAULT_ITEM_REGISTER.id)

    deepEqual(actual, expected)
  })

  it('Should remove a hero for id', async () => {
    const expected = true
    const result = await database.remove(DEFAULT_ITEM_REGISTER.id)

    deepEqual(result, expected)
  })

  it('Should update a hero for id', async () => {
    const expected = {
      ...DEFAULT_ITEM_UPDATE,
      name: 'Gollum',
      power: 'Ring',
    }

    await database.update(expected.id, {
      name: expected.name,
      power: expected.power,
    })
    const [result] = await database.list(expected.id)

    console.log('EXPECTED', expected)
    deepEqual(result, expected)
  })
})