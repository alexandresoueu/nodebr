const assert = require('assert')
const api = require('./../api')
let app = {}

describe.only('API', function () {
  this.beforeAll(async () => {
    app = await api
  })

  it('Show heroes on /heroes', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/heroes'
    })
    const statusCode = result.statusCode
    
    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(JSON.parse(result.payload)))
  })
})