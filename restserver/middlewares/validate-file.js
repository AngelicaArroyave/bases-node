export const validateFileUpload = (req, res, next) => {
    // En la sentencia !req.files.file, el texto file hace referencia al nombre del Key del archivo que se va a subir
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({ msg: 'No files to upload - validateFileUpload' })
    }

    next()
}