import { allowedCollections } from '../helpers/db-validators.js'
import { check } from 'express-validator'
import { loadFile, showImage, updateImage } from '../controllers/uploads.js'
import { Router } from 'express'
import { validateFields } from '../middlewares/validate-fields.js'
import { validateFileUpload } from '../middlewares/validate-file.js'

export const routerUploads = Router()

routerUploads.post('/', validateFileUpload, loadFile)

routerUploads.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'The ID is not valid').isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    validateFields
], updateImage)

routerUploads.get('/:collection/:id', [
    check('id', 'The ID is not valid').isMongoId(),
    check('collection').custom(collection => allowedCollections(collection, ['users', 'products'])),
    validateFields
], showImage)