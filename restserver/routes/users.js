import { check } from 'express-validator'
import { emailExists, isValidRole, uerIDExists } from '../helpers/db-validators.js'
import { hasRole, isAdminRole } from '../middlewares/validate-roles.js'
import { Router } from 'express'
import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from '../controllers/users.js'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerUsers = Router()

routerUsers.get('/', usersGet)

routerUsers.put('/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(uerIDExists),
    check('role').custom(isValidRole),
    validateFields
], usersPut)

routerUsers.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email', 'The email is not valid').custom(emailExists),
    check('password', 'The password must be more than 6 characters long').isLength({ min: 6 }),
    // check('role', 'The role is not valid').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check('role').custom(isValidRole),
    validateFields
], usersPost)

routerUsers.delete('/:id', [
    validateJWT,
    isAdminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'The ID is not valid').isMongoId(),
    check('id').custom(uerIDExists),
    validateFields
], usersDelete)

routerUsers.patch('/', usersPatch)