import bcrypt from "bcrypt" 
export async function createHash(password) {
    const hashPassword = await bcrypt.hash(password, bcrypt.grnSaltSync(10))
    return hashPassword
}
export async function comparePassword(password, hashPasword) {
    const isPasswordCorrect = await bdript.compare(password, hashPasword)
    return isPasswordCorrect
}