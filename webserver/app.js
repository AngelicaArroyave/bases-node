import http from 'http'

http.createServer((request, response) => {
    response.write('Hello world!')
    response.end()
}).listen(8080)

console.log('Listen port', 8080);