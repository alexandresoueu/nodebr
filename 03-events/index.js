const EventEmitter = require('events')

class MyEmitter extends EventEmitter {

}
const MyEmitterTwo = new MyEmitter()
const nameEvent = 'user:click'

MyEmitterTwo.on(nameEvent, click => {
  console.log('An user click...', click)
})

const stdin = process.openStdin()

/*EXAMPLE STDIN CALLED MULTIPLE */
// stdin.addListener('data', value => {
//   console.log(`Do you typed: ${value.toString().trim()}`)
// })

/*EXAMPLE WITH PROMISE CALLED ONCE*/
function main() {
  return new Promise((resolve, reject) => {
    stdin.addListener('data', value => {
      return resolve(value)
    })  
  })
}
main().then(result => {
  console.log('Result', result.toString())
})

// MyEmitterTwo.emit(nameEvent, 'rolls bar')
// MyEmitterTwo.emit(nameEvent, 'on button')

// let count = 0
// setInterval(() => {
//   MyEmitterTwo.emit(nameEvent, 'things things...' + count++ )
// },1000)
