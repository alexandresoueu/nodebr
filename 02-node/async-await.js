
async function getUser() {
    let returnUser
    const userAsync = await new Promise(function userResolve(resolve, reject) {
        try {
            returnUser = setTimeout(() => {
                return resolve({
                    id: 1,
                    name: 'Nemo',
                    bornDate: new Date()
                })
            }, 1000)

        } catch(error) {
            returnUser = console.log('Errou', error)
        }

        return userAsync(returnUser)
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
            return ({
                street: '4 avenue',
                number: 15
            }, 2000)
        })
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
        return getAddress(result.user.id)
            .then(resolveAddress = resultAddress => {
                return {
                    user: result.user,
                    phone: result.phone,
                    address: resultAddress
                }
            })
    })
    .then(resultAddress => {
        console.log(`
            Name: ${result.user.name},
            Address: ${result.address.street}, ${result.address.number},
            Phone: (${result.phone.ddd})${result.phone.number}
        `)
    })
    .catch(function (error) {
        console.log('USER Error!', error)
    })
