import cors from 'cors'
import express from 'express'
import { router } from '../routes/users.js'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        // Middlewares
        this.middlewares()

        // Rutas de la aplicación
        this.routes()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Lectura y parse del body
        this.app.use(express.json())

        // Directorio público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, router)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listen port ${this.port}`))
    }
}