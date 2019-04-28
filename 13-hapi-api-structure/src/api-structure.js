const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDB = require('./db/strategies/mongodb/mongodb')
const HeroSchema = require('./db/strategies/mongodb/schemas/heroesSchema')

const app = new Hapi.Server({
  port: 8000   
})

async function main() {
  const connection = MongoDB.connect()
  const context = new Context(new MongoDB(connection, HeroSchema))
  app.route([
    {
      path: '/heroes',
      method: 'GET',
      handler: (request, head) => {
        return context.read()
      }
    }
  ])
  
  await app.start()
  console.log('Server running at port ==>> ', app.info.port)
}

main()
