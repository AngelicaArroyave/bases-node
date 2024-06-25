import { Role } from "../models/role.js";
import { User } from "../models/user.js";

export const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role })

    if(!existRole) throw new Error(`The role ${role} is not registered in the database`)
}

export const emailExists = async (email = '') => {
    const exists = await User.findOne({ email })

    if(exists) throw new Error(`The email ${email} is not valid because it is registered in the database`)
}