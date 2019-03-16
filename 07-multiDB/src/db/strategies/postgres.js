const ICrud = require('./interface/InterfaceCrud')

class PostgresDB extends ICrud {
  constructor() {
    super()
  }

  create(item) {
    console.log('The item has Saved in POSTGRESDB.#######')
  }
}

module.exports = PostgresDB