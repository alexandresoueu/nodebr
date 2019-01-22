function getUser(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            name: 'Nemo',
            bornDate: new Date()
        })
    }, 1000)
}

function getPhone(idUser, callback) {
    setTimeout(function () {
        return callback(null, {
            phone: 888999,
            ddd: 55
        })
    })
}

function getAddress(idUser, callback) {
  setTimeout(function() {
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
    if(err) {
        console.error('ERROS')
        return
    }
    getPhone(function phoneResolve(err1, phone) {
     if(err1) {
         console.log('ERROOOUUUUUUUUU')
         return 
     }
    })
     getAddress(function addressResolve(err2, address) {
         if(err2) {
             console.log('ERROU MEU AMIGO!')
             return
         }
     })
     console.log(`
      Name: ${user.name},
      Address: ${user.address},
      Phone: ${user.phone}
     `)
})


//const address= getAddress()

//console.log('PHONE NUMBER >>>>', user.phone)