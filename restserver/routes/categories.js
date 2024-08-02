import { categoryDelete, categoryPost, categoryPut, getCategories, getCategory } from '../controllers/categories.js'
import { categoryIDExists } from '../helpers/db-validators.js'
import { check } from 'express-validator'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerCategories = Router()

// Obtener todas las categorias - Publica
routerCategories.get('/', getCategories)

// Obtener una categoria por ID - Publica
routerCategories.get('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(categoryIDExists),
    validateFields
], getCategory)

// Crear categoria - Privado - Cualquier persona con un token valido
routerCategories.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], categoryPost)

// Actualizar un registro de categoria por ID - Privado - Cualquier persona con un token valido
routerCategories.put('/:id', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(categoryIDExists),
    validateFields
], categoryPut)

// Borrar una categoria - Admin
routerCategories.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(categoryIDExists),
    validateFields
], categoryDelete)