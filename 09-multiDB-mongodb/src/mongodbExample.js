const Mongoose = require('mongoose')
Mongoose.connect('mongodb+srv://alexandresoueu:xapo1411@cluster0-qy7bl.mongodb.net/heroes',
  { useNewUrlParser: true }, function (error) {
    if(!error) return
    console.log('Fail Connection', error)
  })

  const connection = Mongoose.connection
  connection.once('open', () => console.log('database is running.....'))
  const state = connection.readyState

  setTimeout(() => {
    console.log('State', state)
  }, 1000)

  /** 
   * 0: Disconect
   * 1: Conected
   * 2: Connecting
   * 3: Disconecting
   */

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

  const model = Mongoose.model('hero', heroSchema)

  async function main() {
    const resultRegister = await model.create({
      names: 'Nemo',
      power: 'Glu Glub'
    })
    console.log('Result Register: ', resultRegister)

    const listItens = await model.find()
    console.log('List Itens: ', listItens)
  }
  main()