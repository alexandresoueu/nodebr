const service = require('./service.js')

async function main() {
  try {
    const result = await service.getPeople('a')
    const names = []
    console.time('FOR')
    for (let index = 0; index <= result.results.length -1; index++) { 
      const people = result.results[index]
      names.push(people.name)
    }
    console.timeEnd('FOR')
    
    console.time('FOR-IN')
    for(let i in result.results) {
      const peopleIN = result.results[i]
      names.push(peopleIN.name)
    }
    console.timeEnd('FOR-IN')

    console.time('FOR-OF')
    for (peopleOF of result.results) {
      names.push(peopleOF.name)
    }
    console.timeEnd('FOR-OF')
    console.log('NAMES --- ', names)
  }
  catch(error) {
    console.error('Failed', error)
  }
}

main()

// service.getPeople('r2')
//   .then(result => {
//     console.log('RESULT SEARCH: ', result)
//   })
//   .catch( error => {
//     console.error('FAIL SEARCH', error)
//   })