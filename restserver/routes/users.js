import { Router } from "express";
import { usersDelete, usersGet, usersPatch, usersPost, usersPut } from "../controllers/users.js";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { emailExists, isValidRole } from "../helpers/db-validators.js";

export const router = Router()

router.get('/', usersGet)

router.put('/:id', usersPut)

router.post('/', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is not valid').isEmail(),
    check('email', 'The email is not valid').custom(emailExists),
    check('password', 'The password must be more than 6 characters long').isLength({ min: 6 }),
    // check('role', 'The role is not valid').isIn([ 'ADMIN_ROLE', 'USER_ROLE' ]),
    check('role').custom(isValidRole),
    validateFields
], usersPost)

router.delete('/', usersDelete)

router.patch('/', usersPatch)