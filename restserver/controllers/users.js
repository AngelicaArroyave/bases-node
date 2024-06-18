import { response } from "express"

export const usersGet = (req, res = response) => {
    res.status(200).json({ msg: 'Get API - Controller' })
}

export const usersPost = (req, res = response) => {
    res.status(201).json({ msg: 'Post API - Controller' })
}

export const usersPut = (req, res = response) => {
    res.status(200).json({ msg: 'Put API - Controller' })
}

export const usersPatch = (req, res = response) => {
    res.status(200).json({ msg: 'Patch API - Controller' })
}

export const usersDelete = (req, res = response) => {
    res.status(200).json({ msg: 'Delete API - Controller' })
}