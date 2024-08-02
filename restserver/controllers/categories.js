import { response } from 'express'
import { Category } from '../models/category.js'

export const categoryPost = async(req, res = response) => {
    const name = req.body.name.toUpperCase()
    const categoryBD = await Category.findOne({ name })

    if(categoryBD) res.status(400).json({ msg: `The category ${categoryBD} already exists` })

    const category = new Category({ name, user: req.user._id })
    await category.save()
    res.status(201).json({ category })
}