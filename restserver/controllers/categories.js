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

export const getCategories = async(req, res = response) => {
    const { limit = 2, from = 0 } = req.query
    const query = { state: true }
    const categories = await Category.find(query).populate('user', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Category.countDocuments(query)

    res.status(200).json({
        categories,
        total
    })
}

export const getCategory = async(req, res = response) => {
    const { id } = req.params
    const category = await Category.findById(id).populate('user', 'name')

    res.status(200).json({ category })
}

export const categoryPut = async(req, res = response) => {
    const { id } = req.params
    const { state, user, ...data } = req.body
    const categoryBD = await Category.findOne({ name: data.name })

    if(categoryBD) res.status(400).json({ msg: `The category ${categoryBD} already exists` })
    
    data.name = data.name.toUpperCase()
    data.user = req.user._id
    // new: true, permite mostrar en la respuesta la actualziacion realizada en BD
    const category = await Category.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json({ category })

}

export const categoryDelete = async(req, res = response) => {
    const { id } = req.params
    const category = await Category.findByIdAndUpdate(id, { state: false }, {new: true})
    res.status(200).json({ category })
}