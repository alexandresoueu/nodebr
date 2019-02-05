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

describe('Handler of Heroes', () => {

  it.only('Should search a Hero using file', async () => {
    const expected = DEFAULT_ITEM_REGISTER
    const [result] = await database.list(expected.id)

    deepEqual(result, expected)
  })

  it('Should register a Hero, using files', () => {
    const expected = DEFAULT_ITEM_REGISTER
     
    ok(null, expected)
  })
})