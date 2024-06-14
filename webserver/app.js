import express from 'express'
import path from 'path'

const app = express()
const PORT = 8080
const __dirname = path.resolve()

// Servir contenido estático
// Se debe especificar el path o ruta 'public'
app.use(express.static('public'))

app.get('/login', function (req, res) {
    res.send('Hello from the login page')
})

app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/public/404.html`)
})

app.listen(PORT, () => console.log(`Listen port ${PORT}`))