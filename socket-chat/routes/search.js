import { Router } from 'express'
import { search } from '../controllers/search.js'

export const routerSearch = Router()

routerSearch.get('/:collection/:term', search)