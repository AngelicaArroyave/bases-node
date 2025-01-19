import { User } from '../models/user.js'
import jwt from 'jsonwebtoken'

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2h'
        }, (error, token) => {
            if(error) {
                console.log(error)
                reject('Token could not be generated')
            } else resolve(token)
        })
    })
}

export const checkJWT = async (token = '') => {
    try {
        if(token.length <= 10) return null

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)
        const user = await User.findById(uid)

        if(user) {
            if(user.state) {
                return user
            } else return null
        } else return null
    } catch (error) {
        return null
    }
}