import bcrypt from "bcrypt"



const saltRounds = 10
export async function hashUserPassword(password: string){
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
}

export async function compareUserPassword(password: string, hashedPassword: string){
    return await bcrypt.compare(password, hashedPassword)
}