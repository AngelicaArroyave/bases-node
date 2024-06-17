import http from 'http'

http.createServer((request, response) => {
    // response.setHeader('Content-Disposition', 'attachment; filename=list.csv')
    // response.writeHead(200, { 'Content-Type': 'application/csv' })
    
    // response.write('id, nombre\n')
    // response.write('1, Andrea\n')
    // response.write('2, Carlos\n')
    // response.write('3, Mariana\n')
    // response.write('4, Juan\n')
    response.write('Hello Wworld!')
    response.end()
}).listen(8080)

console.log('Listen port', 8080);