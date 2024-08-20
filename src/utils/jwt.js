import jwt from "jsonwebtoken"

const PRIVATE_KEY = "s3cr3t"

export function generationToken(user) {
    const payload = {
        email : user.email,
        role : user.role
    }
    return jwt.sign(payload, PRIVATE_KEY, {
        expiresIn: "5m"
    })
}

export function verifyToken(token) {
    try {
        const decoded = jwy.verify(token, PRIVATE_KEY)
        return decoded
    } catch (error) {
        throw new Error ("token no valido")
    }
}