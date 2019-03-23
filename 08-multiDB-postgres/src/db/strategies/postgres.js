const ICrud = require('./interface/InterfaceCrud')
const Sequelize = require('sequelize')

class PostgresDB extends ICrud {
  constructor() {
    super()
    this._driver = null
    this._heroesDB = null
  }

  async isConnected() {
    try{
      await this._driver.authenticate()
      return true
    } catch(error) {
      console.log('Postgres Can not connected!', error)
      return false
    }
  }

  async defineModel() {
    this._heroesDB = this._driver.define('heroes', {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
      },
      names: {
        type: Sequelize.STRING,
        required: true
      },
      power: {
        type: Sequelize.STRING,
        required: true
      }
    }, {
      tableName: 'TB_HEROES',
      freezeTableName: false,
      timestamps: false
    })

    await this._heroesDB.sync()
  }

  async create(item) {
    const { dataValues } = await this._heroesDB.create(item)
    return dataValues
  }

  async connect() {
    this._driver = new Sequelize(
      'heroes',
      'admin',
      'senhaadmin',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false
      }
    )
    await this.defineModel()
  }
}

module.exports = PostgresDB