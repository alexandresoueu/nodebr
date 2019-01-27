const { 
  getPeople
 } = require('./service')

Array.prototype.myReduce = function (callback, initalValue) {
  let finalValue = typeof initalValue !== undefined ? initalValue : this[0]

  for(let index = 0; index <= this.length; index++) {
    finalValue = callback(finalValue,this[index], this)
  }

  return finalValue
}

async function main() {
  try {
    const { 
      results
     } = await getPeople(`a`)
    const height = results.map(item => parseInt(item.height))
    console.log('HEIGHT: ', height)

    const total = height.reduce((previous, next) => {
      return previous + next
    }, 0)

    console.log('TOTAL: ', total)

    const myList = [
      ['Alexandre', 'Oliveira'],
      ['Zaira', 'Red Nose']
    ]

    const totalList = myList.myReduce((previous, next) => {
      return previous.concat(next)
    }, [])
      .join(', ')

    console.log('TOTAL LIST: ', totalList)

  }catch(error) {
    console.error('Reduce ERROR: ', error)
  }
}

main()