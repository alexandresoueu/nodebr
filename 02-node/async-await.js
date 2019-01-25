function getUser() {
    return new Promise(function userResolve(resolve, reject) {
        setTimeout(() => {
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
            }, 2000)
        })
    })
}

function getAddress(idUser) {
    return new Promise(function addressResolve(resolve, reject) {
        setTimeout(() => {
            return resolve({
                street: '4 avenue',
                number: 15
            }, 2000)
        })
    })
}

main()
async function main() {
    try {
        console.time('time-await')
        const user = await getUser()
        //const phone = await getPhone(user.id)
        //const address = await getAddress(user.id)

        const resultAll = await Promise.all([
            getPhone(user.id),
            getAddress(user.id)
        ])

        const phone = resultAll[0]
        const address = resultAll[1]
        console.log(`
            Name: ${user.name},
            Phone: (${phone.ddd})${phone.number},
            Address: ${address.street}, ${address.number}
        `)
        console.timeEnd('time-await')
    }
    catch(error) {
        console.error('CHAPOU O GLOBO..............................', error)
    }
}

// const userPromise = getUser()
// userPromise
//     .then(user => {
//         return getPhone(user.id)
//             .then(resolvePhone = result => {
//                 return {
//                     user: {
//                         name: user.name,
//                         id: user.id
//                     },
//                     phone: result
//                 }
//             })
//     })
//     .then(result => {
//         return getAddress(result.user.id)
//             .then(resolveAddress = result => {
//                 return {
//                     user: result.user,
//                     phone: result.phone,
//                     address: resultAddress
//                 }
//             })
//     })
//     .then(result => {
//         console.log(`
//             Name: ${result.user.name},
//             Address: ${result.address.street}, ${result.address.number},
//             Phone: (${result.phone.ddd})${result.phone.number}
//         `)
//     })
//     .catch(function (error) {
//         console.log('USER Error!', error)
//     })
