const axios = require('axios')
const URL = `https://swapi.co/api/people`

async function getPeople(name) {
  const url = `${URL}/?search=${name}&format=json`
  const response = await axios.get(url)

  return response.data
}

module.exports = {
  getPeople
}
// getPeople('r2')
//   .then(result => {
//     console.log('RESULT SEARCH: ', result)
//   })
//   .catch( error => {
//     console.error('FAIL SEARCH', error)
//   })