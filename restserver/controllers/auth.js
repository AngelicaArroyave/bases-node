import { generateJWT } from '../helpers/generate-jwt.js'
import { response } from 'express'
import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'

export const login = async(req, res = response) => {
    const { email, password } = req.body

    try {
        // Verificar si el email existe
        const user = await User.findOne({ email })

        if(!user) return res.status(400).json({ msg: 'User / Password is not correct - email' })

        // Si el usuario esta activo
        if(!user.state) return res.status(400).json({ msg: 'User / Password is not correct - state: false' })

        // Verificar la contrasena
        const validPassword = bcryptjs.compareSync(password, user.password)

        if(!validPassword) return res.status(400).json({ msg: 'User / Password is not correct - password' })

        // Generar el JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}