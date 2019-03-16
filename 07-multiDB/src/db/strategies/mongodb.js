const ICrud = require('./interface/InterfaceCrud')

class MongoDB extends ICrud {
  constructor() {
    super()
  }
 
  create(item) {
    console.log('The item has saved in MONGODB...........')
  }
 }

 module.exports = MongoDB