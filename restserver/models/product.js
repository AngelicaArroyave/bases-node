import { Schema, model } from 'mongoose'

const ProductSchema = new Schema({
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
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
        required: true
    },
    description: { type: String },
    available: {
        type: Boolean,
        default: true
    },

})

ProductSchema.methods.toJSON = function() {
    const { __v, state, ...data } = this.toObject()
    
    return data
}

export const Product = model('Products', ProductSchema)