const service = require('./service')

Array.prototype.myMap = function (callback) {
  const newArrayMaped = []
  for(let index = 0; index <= this.length -1; index++) {
    const result = callback(this[index], index)
    newArrayMaped.push(result)
  }

  return newArrayMaped
}


async function main() {
  try {
    const result = await service.getPeople(`a`)
    const names = []

    result.results.forEach(function (item) {
      names.push(item.name)
    })

    const namesMap = result.results.map(people => people.name)

    const meMap = result.results.myMap(function (people, index) {
      return `[${index}]-${people.name}`
    })

    //console.log('NAMES: ', names)
    //console.log('NAMES-MAP: ', namesMap)
    console.log('MY MAP NAMES: ', meMap)
  } catch (error) {
    console.error('ERROR', error)
  }
}

main()