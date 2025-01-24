import express, { Application } from 'express'
import usersRouter from '../routes/users'
import cors from 'cors'
import db from '../db/connection'

class Server {
    private app: Application
    private port: string
    private paths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'

        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    async dbConnection() {
        try {
            await db.authenticate()
            console.log('Database online')
        } catch (error: any) {
            throw new Error(error)
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Lectura del body (parsear json o body)
        this.app.use(express.json())

        // Carpeta pública
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.paths.users, usersRouter)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`)
        })
    }
}

export default Server