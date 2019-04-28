const Sequelize = require('sequelize')

const HeroSchema = {
  name: 'heroes',
  schema: {
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
  },
  options: {
    tableName: 'TB_HEROES',
    freezeTableName: false,
    timestamps: false
  }
}

module.exports = HeroSchema