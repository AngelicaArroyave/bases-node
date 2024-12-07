import { createServer } from 'http'
import { Server as SocketServer } from 'socket.io'
import { socketController } from '../sockets/controller.js'
import cors from 'cors'
import express from 'express'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {}
        this.socketServer = createServer(this.app)
        this.io = new SocketServer(this.socketServer)

        // Middlewares
        this.middlewares()

        // Rutas de la aplicación
        this.routes()

        // Sockets
        this.sockets()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes() {}

    sockets() {
        // this.io seria como el servidor
        this.io.on('connection', socketController)
    }

    listen() {
        this.socketServer.listen(this.port, () => console.log(`Listen port ${ this.port }`))
    }
}