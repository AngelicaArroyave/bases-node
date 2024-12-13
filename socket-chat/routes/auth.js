import { check } from 'express-validator'
import { googleSignIn, login } from '../controllers/auth.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'

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