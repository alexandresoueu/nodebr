const Commander = require('commander')
const Database = require('./database')
const Hero = require('./hero')

async function main() {
    Commander
    .version('v1')
    .option('-n, --name [value]', "Name of Hero!")
    .option('-p, --power [value]', "Power of Hero!")
    .option('-c, --register [value]', "Register of Hero!")
    .option('-l, --list [value]', "List of Heroes!")
    .option('-r, --remove', "Remove a Hero!")
    .option('-i, --id [value]', "Id of Hero!")
    .option('-u, --update [value]', "Update Hero!")

    .parse(process.argv)

    const hero = new Hero(Commander)
    try {
      if(Commander.register) {
        delete hero.id
        const result = await Database.register(hero)
        if(!result) {
          console.error('Hero not registered!')
          return
        }
        console.log('Hero registered successfully')
      }

      if(Commander.list) {
        const result = await Database.list()
        console.log(result)
        return
      }

      if(Commander.remove) {
        const result = await Database.remove(hero.id)
        if(!result) {
          console.error('Not possible removed Hero!')
          return
        }
        console.log('Hero removed with success!')
      }

      if(Commander.update) {
        const idForUpdate = parseInt(Commander.update)
        const data = JSON.stringify(hero)
        const heroUpdate = JSON.parse(data)
        const result = await Database.update(idForUpdate, heroUpdate)

        if(!result) {
          console.error('Do not update hero!')
          return
        }
        console.log('Hero Updated!!!!!!')
      }

    } catch(error) {
      console.error('Not working!!!', error)
    }
}

main()