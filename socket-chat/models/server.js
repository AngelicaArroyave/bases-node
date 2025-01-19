import { createServer } from 'http'
import { dbConnection } from '../database/config.js'
import { routerAuth } from '../routes/auth.js'
import { routerCategories } from '../routes/categories.js'
import { routerProducts } from '../routes/products.js'
import { routerSearch } from '../routes/search.js'
import { routerUploads } from '../routes/uploads.js'
import { routerUsers } from '../routes/users.js'
import { Server as SocketServer } from 'socket.io'
import { socketController } from '../sockets/socketController.js'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'

export class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.socketServer = createServer(this.app)
        this.io = new SocketServer(this.socketServer)
        this.paths = {
            auth: '/api/auth',
            search: '/api/search',
            categories: '/api/categories',
            products: '/api/products',
            uploads: '/api/uploads',
            users: '/api/users'
        }

        // Conectar a la base de datos
        this.connectToDB()

        // Middlewares
        this.middlewares()

        // Rutas de la aplicación
        this.routes()

        // Sockets
        this.sockets()
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

        // File upload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes() {
        this.app.use(this.paths.auth, routerAuth)
        this.app.use(this.paths.categories, routerCategories)
        this.app.use(this.paths.products, routerProducts)
        this.app.use(this.paths.search, routerSearch)
        this.app.use(this.paths.uploads, routerUploads)
        this.app.use(this.paths.users, routerUsers)
    }

    sockets() {
        // this.io seria como el servidor
        this.io.on('connection', socket => socketController(socket, this.io))
    }

    listen() {
        this.socketServer.listen(this.port, () => console.log(`Listen port ${this.port}`))
    }
}