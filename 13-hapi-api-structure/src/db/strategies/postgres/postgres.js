const ICrud = require('../interface/InterfaceCrud')
const Sequelize = require('sequelize')

class PostgresDB extends ICrud {
  constructor(connection, schema) {
    super()
    this._connection = connection
    this._schema = schema
  }

  async isConnected() {
    try{
      await this._connection.authenticate()
      return true
    } catch(error) {
      console.log('Postgres Can not connected!', error)
      return false
    }
  }

  static async defineModel(connection, schema) {
    const model = connection.define(
      schema.name,
      schema.schema,
      schema.options,
    )
    await model.sync()
    return model
  }

  async create(item) {
    const { dataValues } = await this._schema.create(item)
    return dataValues
  }

  async read(item = {}) {
    const result = this._schema.findAll({where: item, raw: true})
    return result
  }

  async update(id, item) {
    const r = await this._schema.update(item, {where: {id : id}})
    return r
  }

  async delete(id) {
    const query = id ? { id } : {}
    return this._schema.destroy({ where: query })
  }

  static async connect() {
    const connection = new Sequelize(
      'heroes',
      'admin',
      'senhaadmin',
      {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorsAliases: false,
        logging: false,
      }
    )
    return connection
  }
}

module.exports = PostgresDB