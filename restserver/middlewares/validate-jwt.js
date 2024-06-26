import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.js'

export const validateJWT = async(req = request, res = response, next) => {
    const token = req.header('x-token')

    if(!token) return res.status(401).json({ msg: 'No token in the request' })

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid)

        // Si el usuario no existe
        if(!user) return res.status(401).json({ msg: 'Token is not valid - User does not exist in the database' })

        // Verificar si el uid está activo
        if(!user.state) return res.status(401).json({ msg: 'Token is not valid - User with status: false' })
        
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'Toke is not valid' })
    }
}