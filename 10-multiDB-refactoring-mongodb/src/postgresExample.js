const Sequelize = require('sequelize')
const driver = new Sequelize(
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

async function main() {
  const HeroesDB = driver.define('heroes', {
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
  await HeroesDB.sync()

  await HeroesDB.create({
    names: 'Mommy Shark',
    power: 'Middle bit'
  })

  const result = await HeroesDB.findAll({ 
    raw: true,
    attributes: ['names'] 
  })
  console.log('Result: ', result)
}

main()