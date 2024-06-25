import { request, response } from "express"
import { User } from "../models/user.js"
import bcryptjs from 'bcryptjs'

export const usersGet = (req = request, res = response) => {
    const { q, name = 'No name', apiKey, page = "1", limit } = req.query
    
    res.status(200).json({
        msg: 'Get API - Controller',
        q,
        name,
        apiKey,
        page,
        limit
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

export const usersPut = (req, res = response) => {
    const id = req.params.id

    res.status(200).json({
        msg: 'Put API - Controller',
        id
    })
}

export const usersPatch = (req, res = response) => {
    res.status(200).json({ msg: 'Patch API - Controller' })
}

export const usersDelete = (req, res = response) => {
    res.status(200).json({ msg: 'Delete API - Controller' })
}