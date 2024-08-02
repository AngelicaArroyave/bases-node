import { categoryPost } from '../controllers/categories.js'
import { check } from 'express-validator'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerCategories = Router()

// Obtener todas las categorias - Publica
routerCategories.get('/', (req, res) => {
    res.json('Get')
})

// Obtener una categoria por ID - Publica
routerCategories.get('/:id', (req, res) => {
    res.json('Get - ID')
})

// Crear categoria - Privado - Cualquier persona con un token valido
routerCategories.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], categoryPost)

// Actualizar un registro de categoria por ID - Privado - Cualquier persona con un token valido
routerCategories.put('/:id', (req, res) => {
    res.json('Put')
})

// Borrar una categoria - Admin
routerCategories.delete('/:id', (req, res) => {
res.json('Delete')
})