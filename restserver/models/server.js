import { dbConnection } from '../database/config.js'
import { routerAuth } from '../routes/auth.js'
import { routerUsers } from '../routes/users.js'
import cors from 'cors'
import express from 'express'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        // Conectar a la base de datos
        this.connectToDB()

        // Middlewares
        this.middlewares()

        // Rutas de la aplicación
        this.routes()
    }

    async connectToDB() {
        await dbConnection()
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
        this.app.use(this.authPath, routerAuth)
        this.app.use(this.usersPath, routerUsers)
    }

    listen() {
        this.app.listen(this.port, () => console.log(`Listen port ${this.port}`))
    }
}