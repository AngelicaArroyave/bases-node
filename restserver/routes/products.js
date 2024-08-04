import { categoryIDExists, productIDExists } from '../helpers/db-validators.js'
import { check } from 'express-validator'
import { getProduct, getProducts, productDelete, productPost, productPut } from '../controllers/products.js'
import { isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerProducts = Router()

routerProducts.get('/', getProducts)

routerProducts.get('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(productIDExists),
    validateFields
], getProduct)

routerProducts.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category', 'The ID is not valid').isMongoId(),
    check('category').custom(categoryIDExists),
    check('description', 'The description is required').not().isEmpty(),
    validateFields
], productPost)

routerProducts.put('/:id', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    check('category').custom(categoryIDExists),
    check('description', 'The description is required').not().isEmpty(),
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(productIDExists),
    validateFields
], productPut)

routerProducts.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(productIDExists),
    validateFields
], productDelete)