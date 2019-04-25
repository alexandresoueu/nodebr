const Mongoose = require('mongoose')

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

module.exports = Mongoose.model('hero', heroSchema)