import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [ true, 'The name is required' ],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

CategorySchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject()
    
    return data
}

export const Category = model('Categories', CategorySchema)