export const socketController =  client => {
    client.on('message', (message, callback) => {
        const id = 123456
        callback(id)

        // Enviar mensaje a todos los clientes conectados
        client.broadcast.emit('message', message)
    })
}