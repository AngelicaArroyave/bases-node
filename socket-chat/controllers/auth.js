import { generateJWT } from '../helpers/generate-jwt.js'
import { response } from 'express'
import { User } from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { googleVerify } from '../helpers/google-verify.js'

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

export const googleSignIn = async(req, res = response) => {
    const { id_token } = req.body
    
    try {
        const { name, picture, email } = await googleVerify(id_token)
        let user = await User.findOne({ email })

        // Crear usuario
        if(!user) {
            const data = {
                name,
                email,
                password: '123456',
                img: picture,
                google: true,
                role: 'USER_ROLE',
                state: true
            }
            user = new User(data)
            await user.save()
        }

        // Si el usuario en DB tiene estado en false
        if(!user.state) return res.status(401).json({ msg: 'You must contact the administrator, user blocked' })

        // Generar el JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token could not be verified'
        })
    }
}

export const renewToken = async(req, res = response) => {
    const { user } = req

    // Generar el JWT
    const token = await generateJWT(user.id)

    res.json({
        user,
        token
    })
}