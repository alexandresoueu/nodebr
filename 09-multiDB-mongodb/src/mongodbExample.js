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