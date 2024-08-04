import { Category } from '../models/category.js'
import { Product } from '../models/product.js'
import { response } from 'express'
import { Types } from 'mongoose'
import { User } from '../models/user.js'

const allowedCollections = ['users', 'categories', 'products', 'rols']

export const search = async(req, res = response) => {
    const { collection, term } = req.params

    if(!allowedCollections.includes(collection)) return res.status(400).json({ msg: `The allowed collections are ${allowedCollections}` })

    switch (collection) {
        case 'users':
            await searchUsers(term, res)
            break;
        case 'categories':
            await searchCategories(term, res)
            break;
        case 'products':
            await searchProducts(term, res)
            break;
        default:
            res.status(500).json({ msg: 'Forgot to make this search' })
    }
}

const searchUsers = async(term = '', res = response) => {
    const isMongoId = Types.ObjectId.isValid(term)

    if(isMongoId) {
        const user = await User.findById(term)
        return res.json({
            results: (user) ? [ user ] : []
        })
    }

    const regex = new RegExp(term, 'i')
    const users = await User.find({
        $or:[{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    })
    res.json({
        results: users
    })
}

const searchCategories = async(term = '', res = response) => {
    const isMongoId = Types.ObjectId.isValid(term)

    if(isMongoId) {
        const category = await Category.findById(term).populate('user', 'name')
        return res.json({
            results: (category) ? [ category ] : []
        })
    }

    const regex = new RegExp(term, 'i')
    const categories = await Category.find({ name: regex, state: true }).populate('user', 'name')
    res.json({
        results: categories
    })
}

const searchProducts = async(term = '', res = response) => {
    const isMongoId = Types.ObjectId.isValid(term)

    if(isMongoId) {
        const product = await Product.findById(term).populate('category', 'name').populate('user', 'name')
        return res.json({
            results: (product) ? [ product ] : []
        })
    }

    const regex = new RegExp(term, 'i')
    const products = await Product.find({ name: regex, state: true }).populate('category', 'name').populate('user', 'name')
    res.json({
        results: products
    })
}