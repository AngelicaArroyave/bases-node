import { check } from 'express-validator'
import { googleSignIn, login, renewToken } from '../controllers/auth.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'

export const routerAuth = Router()

routerAuth.post('/login', [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
], login)

routerAuth.post('/google', [
    check('id_token', 'Google token is required').not().isEmpty(),
    validateFields
], googleSignIn)

routerAuth.get('/', validateJWT, renewToken)