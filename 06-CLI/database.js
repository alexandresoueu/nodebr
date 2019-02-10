const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
  constructor() {
    this.NAME_FILE = 'heroes.json'
  }
  
  async getDataFile() {
    const file = await readFileAsync(this.NAME_FILE, 'utf-8')
    return JSON.parse(file.toString())
  }

  async writeFile(data) {
    await writeFileAsync(this.NAME_FILE, JSON.stringify(data))
    return true
  }

  async register(hero) {
    const data = await this.getDataFile()
    const id = hero.id <= 2 ? hero.id : Date.now()
    
    const heroWithId = {
      id,
      ...hero
    }
    const dataFinal = [
      ...data,
      heroWithId
    ]
    const result = await this.writeFile(dataFinal)
    return result
  }

  async list(id) {
    const data = await this.getDataFile()
    const dataFilter = data.filter(item => (id ? (item.id === id) : true ))
    return dataFilter
  }

  async update(id, changes) {
    const data = await this.getDataFile()
    const index = data.findIndex(item => item.id === parseInt(id))

    if(index === -1) {
      throw Error('The Hero not exist!')
    }

    const atual = data[index]
    const objectUpdate = {
      ...atual,
      ...changes
    }
    data.splice(index, 1)

    return await this.writeFile([
      ...data,
      objectUpdate
    ])
  }

  async remove(id) {
    if(!id) {
      return await this.writeFile([])
    }

    const data = await this.getDataFile()
    const index = data.findIndex(item => item.id === parseInt(id))

    if(index === -1) {
      throw Error('The user informed not exist!!')
    }

    data.splice(index, 1)
      return await this.writeFile(data) 
  }
}

module.exports = new Database()