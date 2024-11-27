import { request, response } from 'express'
import { uploadFile } from '../helpers/upload-file.js'

export const loadFile = async (req = request, res = response) => {
    // En la sentencia !req.files.file, el texto file hace referencia al nombre del Key del archivo que se va a subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'No files to upload' });
    }

    try {
        // const name = await uploadFile(req.files, ['txt', 'md'], 'texts')
        const name = await uploadFile(req.files, undefined, 'images')
    
        res.json({ name })
    } catch (error) {
        res.status(400).json({ msg: error })
    }
}