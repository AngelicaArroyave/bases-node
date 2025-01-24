import { DataTypes } from 'sequelize'
import db from '../db/connection'

const User = db.define('User', {
    idUsers: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN
    }
}, {
    timestamps: true // Incluye createdAt y updatedAt
})

export default User