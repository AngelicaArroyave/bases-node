import { Request, Response } from 'express'

export const getUsers = (req: Request, res: Response) => {
    res.json({ message: 'Get Users' })
}

export const getUser = (req: Request, res: Response) => {
    const { id } = req.params

    res.json({
        message: 'Get User',
        id
    })
}

export const postUser = (req: Request, res: Response) => {
    const { body } = req

    res.json({
        message: 'Post User',
        body
    })
}

export const putUser = (req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    res.json({
        message: 'Put User',
        id,
        body
    })
}

export const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params

    res.json({
        message: 'Delete User',
        id
    })
}