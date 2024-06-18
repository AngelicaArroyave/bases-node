import { request, response } from "express"

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

export const usersPost = (req, res = response) => {
    const body = req.body
    res.status(201).json({
        msg: 'Post API - Controller',
        body
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