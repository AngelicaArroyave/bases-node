import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

export const uploadFile = (files, validatedExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    return new Promise((resolve, reject) => {
        const { file } = files;
        const nameCut = file.name.split('.');
        const extension = nameCut[nameCut.length - 1];

        // Validar extensión
        if(!validatedExtensions.includes(extension)) return reject(`The extension ${ extension } is not valid - ${ validatedExtensions }`)

        // Renombrar el archivo con el uuid
        const nameTemp = `${ uuidv4() }.${ extension }`
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        file.mv(uploadPath, err => {
            if (err) return reject(err)

            resolve(nameTemp)
        });
    })
}