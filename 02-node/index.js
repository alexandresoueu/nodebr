function getUser() {
    return new Promise(function userResolve(resolve, reject) {
        setTimeout(function () {
            //return reject(new Error('DEU RUINZAUM'))
            return resolve({
                id: 1,
                name: 'Nemo',
                bornDate: new Date()
            })
        }, 1000)
    })
}

function getPhone(idUser, callback) {
    setTimeout(function () {
        
        return callback(null, {
            phone: '888999',
            ddd: 55
        })

        
    })
}

function getAddress(idUser, callback) {
    setTimeout(function () {
        return callback(null, {
            street: '4 avenue',
            number: 15
        })
    })
}

function userResolve(err, user) {
    console.log('USER >>>>', user)
}

const user = getUser()
user
    .then(result => {
        console.log('Result', result)
    })
    .catch(error => {
        console.log('USER Error!', error)
    })
/* getUser(function userResolve(err, user) {
    if (err) {
        console.error('ERROUUUUU O USER ', err)
        return
    }

    getPhone(user.id, function phoneResolve(err1, phone) {
        if (err1) {
            console.error('ERROOOU O PHONE ', err1)
            return
        }
        
        getAddress(user.id, function addressResolve(err2, address) {
            if (err2) {
                console.error('ERROU THE ADDRESS: ', err2)
                return
            }
            console.log(`
              Name: ${user.name},
              Address: ${address.street},
              Phone: ${phone.ddd}-${phone.number}
             `)
        })
    })

}) */
