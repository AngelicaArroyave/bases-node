import { request, response } from 'express'
import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'

export const usersGet = async(req = request, res = response) => {
    const { limit = 2, from = 0 } = req.query
    // Solo muestra los usuario cuyo estado es verdadero, es decir, si estubiera activo
    const query = { state: true }
    const users = await User.find(query).skip(Number(from)).limit(Number(limit))
    const total = await User.countDocuments(query)
    
    res.status(200).json({
        total,
        users
    })
}

export const usersPost = async(req, res = response) => {
    const { name, email, password, role } = req.body
    const user = new User({ name, email, password, role })

    // Encriptar el password
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()
    res.status(201).json({
        user
    })
}

export const usersPut = async(req, res = response) => {
    const { id } = req.params
    // Los campos email, password y google no se pueden modificar
    const { _id, email, password, google, ...rest } = req.body

    if(password) {
        // Encriptar el password
        const salt = bcryptjs.genSaltSync(10)
        rest.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, rest)

    res.status(200).json(user)
}

export const usersPatch = (req, res = response) => {
    res.status(200).json({ msg: 'Patch API - Controller' })
}

export const usersDelete = async(req, res = response) => {
    const { id } = req.params

    // Eliminar un registro fisicamente
    // const user = await User.findByIdAndDelete(id)
    // No se elimina el registro de la BD, pero se modifica el estado
    const user = await User.findByIdAndUpdate(id, { state: false })

    res.status(200).json({ user })
}