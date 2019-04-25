const ICrud = require('../interface/InterfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting'
}

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super()
    this._schema = schema
    this._connection = connection
  }

  async isConnected() {
    const state = STATUS[this._connection.readyState]
    if(state === 'Connected') return state;

    if(state !== 'Connecting') return state
    await new Promise(resolve => setTimeout(resolve, 1500))
    return STATUS[this._connection.readyState]
  }

  static connect() {
    const Mongoose = require('mongoose')
    Mongoose.connect('mongodb+srv://alexandresoueu:xapo1411@cluster0-qy7bl.mongodb.net/heroes',
    
      { useNewUrlParser: true }, function (error) {
        if (!error) return
        console.log('Fail Connection', error)
      })

    const connection = Mongoose.connection
    this._connection = connection
    connection.once('open', () => console.log('MONGO database is running.....'))
    
    return connection
  }

  create(item) {
    return this._schema.create(item)
  }

  read(item, skip=0, limit=10) {
    return this._schema.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    console.log('ID: ', id)
    return this._schema.updateOne({ _id: id }, { $set: item })
  }

  delete(id) {
    return this._schema.deleteOne({ _id: id})
  }
}

module.exports = MongoDB