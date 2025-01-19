import mongoose from 'mongoose'

export const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN)
    } catch (error) {
        throw new Error('Database connection error')
    }
}