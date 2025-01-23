import { Router } from 'express'
import { deleteUser, getUser, getUsers, postUser, putUser } from '../controllers/users'

const usersRouter = Router()

usersRouter.get('/', getUsers)
usersRouter.get('/:id', getUser)
usersRouter.post('/', postUser)
usersRouter.put('/:id', putUser)
usersRouter.delete('/:id', deleteUser)

export default usersRouter