const { 
  getPeople 
} = require('./service')

Array.prototype.myFilter = function (callback) {
  const list = []
  for(index in this) {
    const item = this[index]
    const result = callback(item, index, this)

    if(!result) continue
    list.push(item)
  }
  return list
}

async function main() {
  try {
    const { 
      results 
    } = await getPeople(`a`)
    
    const familyLars = results.filter(function(item) {
      const result = item.name.toLowerCase().indexOf(`lars`) !== -1
      return result
    })

    const familySkywalker = results.myFilter((item, index, list) => {
      console.log(`index: ${index}`, list.length)
      return item.name.toLowerCase().indexOf(`sky`) !== -1
    })
    
    const names = familyLars.map((people) => people.name)
    console.log('NAMES: ', names)
    
    const namesSky = familySkywalker.map((peopleSky) => peopleSky.name)
    console.log('NAMES SKYS: ', namesSky)
    
  } catch(error) {
    console.error('FILTER ERROR', error)
  }
}

main()