export const socketController =  client => {
    console.log('Client connected', client.id)

    client.on('disconnect', () => {
        console.log('Client disconnected', client.id)
    })

    client.on('message', (message, callback) => {
        const id = 123456
        callback(id)

        // Enviar mensaje a todos los clientes conectados
        client.broadcast.emit('message', message)
    })
}