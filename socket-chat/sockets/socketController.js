import { checkJWT } from '../helpers/generate-jwt.js'
import { ChatMessages } from '../models/chat-messages.js'

const chatMessages = new ChatMessages()

export const socketController = async (socket, io) => {
    const user = await checkJWT(socket.handshake.headers['x-token'])

    if(!user) return socket.disconnect()

    // Agregar el usuario conectado
    chatMessages.connectUser(user)
    // Devuelve todos los usuarios conectados
    io.emit('users-online', chatMessages.usersArr)
    socket.emit('receive-messages', chatMessages.lastTen)

    // Conectarse a una sala especial
    socket.join(user.id) // global, socket.id, user.id

    // Limpiar cuando un usuario se desconecta
    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user.uid)
        io.emit('users-online', chatMessages.usersArr)
    })

    // socket.on('send-message', ({ uid, message }) => {
    socket.on('send-message', ({ uid, message }) => {
        if(uid) {
            // Mensaje privado
            socket.to(uid).emit('message-private', { from: user.name, message })
        } else {
            chatMessages.sendMessage(user.id, user.name, message)
            io.emit('receive-messages', chatMessages.lastTen)
        }
    })
}