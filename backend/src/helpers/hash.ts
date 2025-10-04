import bcrypt from "bcrypt"

const saltRounds = 10
export async function hashUserPassword(password: string){
    return await Bun.password.hash(password,{
        algorithm: "argon2id",
        memoryCost: 4,
        timeCost: 3
    })
}

export async function compareUserPassword(password: string, hashedPassword: string){
    return await Bun.password.verify(password, hashedPassword)
}