import { Schema, model } from "mongoose"

const UserSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'The name field is required' ]
    },
    email: {
        type: String,
        required: [ true, 'The email field is required' ],
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'The password field is required' ]
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    state: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject()
    return user
}

export const User = model('Users', UserSchema)