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

main()
async function main() {
    try {
        const user = await getUser()
        const resultAll = await Promise.all([
            getPhone(user.id),
            addressAsync(user.id)
        ])

        const phone = resultAll[0]
        const address = resultAll[1]

        console.log(`
            Name: ${user.name},
            Phone:  ${phone.ddd},
            Address: ${address.street}
        `)
    }
    catch(error) {
        console.error('WE HAVE A PROBLEM', error)
    }
}