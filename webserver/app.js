import express from 'express'
import hbs from 'hbs'
import path from 'path'

const app = express()
const PORT = 8080
const __dirname = path.resolve()
const information = {
    name: 'TEMPLATED',
    title: 'Road Trip'
}

// Handlebar
app.set('view engine', 'hbs')
hbs.registerPartials(`${__dirname}/views/partials`)

// Servir contenido estático
// Se debe especificar el path o ruta 'public'
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('home', information)
})

app.get('/generic', function (req, res) {
    res.render('generic', information)
})

app.get('/elements', function (req, res) {
    res.render('elements', information)
})

app.get('*', function (req, res) {
    res.sendFile(`${__dirname}/public/404.html`)
})

app.listen(PORT, () => console.log(`Listen port ${PORT}`))