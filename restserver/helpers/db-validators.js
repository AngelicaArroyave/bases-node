import { Category } from '../models/category.js'
import { Product } from '../models/product.js'
import { Role } from '../models/role.js'
import { User } from '../models/user.js'

export const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role })

    if(!existRole) throw new Error(`The role ${role} is not registered in the database`)
}

export const emailExists = async (email = '') => {
    const exists = await User.findOne({ email })

    if(exists) throw new Error(`The email ${email} is not valid because it is registered in the database`)
}

export const uerIDExists = async (id = '') => {
    const exists = await User.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}

export const categoryIDExists = async (id = '') => {
    const exists = await Category.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}

export const productIDExists = async (id = '') => {
    const exists = await Product.findById(id)

    if(!exists) throw new Error(`The ID ${id} does not exist in the database`)
}

export const allowedCollections = (collection = '', allowedCollections = []) => {
    const isIncluded = allowedCollections.includes(collection)

    if(!isIncluded) throw new Error(`The collection ${ collection } is not allowed, ${ allowedCollections }`)

    return true
}