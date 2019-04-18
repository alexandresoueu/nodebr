const ICrud = require('./interface/InterfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting'
}

class MongoDB extends ICrud {
  constructor() {
    super()
    this._heroes = null
    this._driver = null
  }

  async isConnected() {
    const state = STATUS[this._driver.readyState]
    if(state === 'Connected') return state;

    if(state !== 'Connecting') return state
    await new Promise(resolve => setTimeout(resolve, 1500))
    return STATUS[this._driver.readyState]
  }

  defineModel() {
    const heroSchema = new Mongoose.Schema({
      names: {
        type: String,
        required: true,
      },
      power: {
        type: String,
        required: true,
      },
      insertedAt: {
        type: Date,
        default: new Date(),
      }
    })

    this._heroes = Mongoose.model('hero', heroSchema)
  }

  connect() {
    const Mongoose = require('mongoose')
    Mongoose.connect('mongodb+srv://alexandresoueu:xapo1411@cluster0-qy7bl.mongodb.net/heroes',
    
      { useNewUrlParser: true }, function (error) {
        if (!error) return
        console.log('Fail Connection', error)
      })

    const connection = Mongoose.connection
    this._driver = connection
    connection.once('open', () => console.log('MONGO database is running.....'))

    this.defineModel()
  }

  create(item) {
    return this._heroes.create(item)
  }

  read(item, skip=0, limit=10) {
    return this._heroes.find(item).skip(skip).limit(limit)
  }

  update(id, item) {
    console.log('ID: ', id)
    return this._heroes.updateOne({ _id: id }, { $set: item })
  }
}

module.exports = MongoDB