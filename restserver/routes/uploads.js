import { check } from 'express-validator'
import { Router } from 'express'
import { loadFile } from '../controllers/uploads.js'
import { validateFields } from '../middlewares/validate-fields.js'

export const routerUploads = Router()

routerUploads.post('/', loadFile)