const util = require('util')
const addressAsync = util.promisify(getAddress)

function getUser() {
    return new Promise(function userResolve(resolve, reject) {
        setTimeout(() => {
            //return reject(new Error('DEU RUINZAUM'))
            return resolve({
                id: 1,
                name: 'Nemo',
                bornDate: new Date()
            })
        }, 1000)
    })
}

function getPhone(idUser) {
    return new Promise(function phoneResolve(resolve, reject) {
        setTimeout(() => {
            return resolve({
                number: '55555-4444',
                ddd: 55
            },2000)  
        })
    })
}

function getAddress(idUser, callback) {
    setTimeout(() => {
        return callback(null, {
            street: '4 avenue',
            number: 15
        }, 2000)
    })
}

const userPromise = getUser()
userPromise
    .then(user => {
        return getPhone(user.id)
            .then(resolvePhone = result => {
                return {
                    user: {
                        name: user.name,
                        id: user.id
                    },
                    phone: result
                }
            })
    })
    .then(result => {
        const address = addressAsync(result.user.id)
        return address.then(resolveAddress = resultAddress => {
            return {
                user: result.user,
                phone: result.phone,
                address: resultAddress
            
            }
        })
    })
    .then(result => {
        console.log(`
            Name: ${result.user.name},
            Address: ${result.address.street}, ${result.address.number},
            Phone: (${result.phone.ddd})${result.phone.number}
        `)
    })
    .catch(function (error) {
        console.log('USER Error!', error)
    })
