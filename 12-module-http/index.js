const http = require('http')

http.createServer((request, response) => {
    response.end('HELLS BELLS ! ! !')
})
.listen(7000, () => console.log('The server is running.......'))