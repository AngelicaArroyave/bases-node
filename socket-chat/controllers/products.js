import { Product } from '../models/product.js'
import { response } from 'express'

export const productPost = async(req, res = response) => {
    const { state, user, ...data } = req.body
    const productBD = await Product.findOne({ name: data.name })

    if(productBD) res.status(400).json({ msg: `The product ${productBD} already exist` })

    const product = new Product({ ...data, user: req.user._id, })
    await product.save()
    res.status(201).json({ product })
}

export const getProducts = async(req, res = response) => {
    const { limit = 2, from = 0 } = req.query
    const query = { state: true }
    const products = await Product.find(query).populate('user', 'name').populate('category', 'name').skip(Number(from)).limit(Number(limit))
    const total = await Product.countDocuments(query)

    res.status(200).json({
        products,
        total
    })
}

export const getProduct = async(req, res = response) => {
    const { id } = req.params
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name')

    res.status(200).json({ product })
}

export const productPut = async(req, res = response) => {
    const { id } = req.params
    const { state, user, ...data } = req.body
    const productBD = await Product.findOne({ name: data.name })

    if(productBD) res.status(400).json({ msg: `The product ${productBD} already exists` })
    
    data.user = req.user._id
    const product = await Product.findByIdAndUpdate(id, data, { new: true })
    res.status(200).json({ product })

}

export const productDelete = async(req, res = response) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true })
    res.status(200).json({ product })
}