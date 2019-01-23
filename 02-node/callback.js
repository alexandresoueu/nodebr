function getUser(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            name: 'Nemo',
            bornDate: new Date()
        })
    }, 1000)
}

function getPhone(idUser, callback, callback3) {
    setTimeout(function () {
        
        callback3('12', 14, '15')

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

function phoneResolve(err1, phone) {
    console.log('PHONE >>>>>', phone)
}

function addressResolve(err2, address) {
    console.log('ADDRESS ++++', address)
}

getUser(function userResolve(err, user) {
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
    }, (um, dois, tres) => { 
        console.log(um, dois, tres)
    })

})
