import { Product } from '../models/product.js'
import { request, response } from 'express'
import { uploadFile } from '../helpers/upload-file.js'
import { User } from '../models/user.js'
import { fileURLToPath } from 'url'
import fs from 'fs'
import path from 'path'

export const loadFile = async (req = request, res = response) => {
    try {
        // const name = await uploadFile(req.files, ['txt', 'md'], 'texts')
        const name = await uploadFile(req.files, undefined, 'images')
    
        res.json({ name })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}

export const updateImage = async (req = request, res = response) => {
    const {id, collection} = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if(!model) return res.status(400).json({ msg: `The user does not exist in the database with the ID ${ id }` })

            break;
        case 'products':
            model = await Product.findById(id)
            if(!model) return res.status(400).json({ msg: `The product does not exist in the database with the ID ${ id }` })

            break;
        default:
            return res.status(500).json({ msg: 'Not validated' });
    }

    // Limpiar imágenes previas
    if(model.img) {
        // Borrar imagenn del servidor
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const pathImage = path.join(__dirname, '../uploads/', collection, model.img);

        if(fs.existsSync(pathImage)) fs.unlinkSync(pathImage)
    }

    const name = await uploadFile(req.files, undefined, collection)
    model.img = name
    await model.save()
    res.json(model)
}

export const showImage = async (req = request, res = response) => {
    const {id, collection} = req.params
    let model

    switch (collection) {
        case 'users':
            model = await User.findById(id)
            if(!model) return res.status(400).json({ msg: `The user does not exist in the database with the ID ${ id }` })

            break;
        case 'products':
            model = await Product.findById(id)
            if(!model) return res.status(400).json({ msg: `The product does not exist in the database with the ID ${ id }` })

            break;
        default:
            return res.status(500).json({ msg: 'Not validated' });
    }

    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    // Limpiar imágenes previas
    if(model.img) {
        // Borrar imagenn del servidor
        const pathImage = path.join(__dirname, '../uploads/', collection, model.img);
        
        if(fs.existsSync(pathImage)) return res.sendFile(pathImage)
    }
    
    const pathImageNotFound = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImageNotFound)
}