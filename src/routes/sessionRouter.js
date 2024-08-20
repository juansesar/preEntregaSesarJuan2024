import { Router} from "express"
import {userModel} from "../models/user.model.js"

const router = Router()

router.post("/login", async (req, res) =>{
    const {email, password} = req.body
    if ( !email || !password){
        return res.status(500).json({error: "faltan datos, email o contraseña"})
    }
    try {
        const user = await user.model.findOne({email})
        if (!user){
            return res.status(401).json({error: "el usuario no fue encontrado"})
        }
        const isPasswordCorrect = await comparePassword(password, user.password)
        if (!isPasswordCorrect){
            return res.status(401).json({error: "no se encuentra la contraseña o contraseña incorrecta"})
        }

        const token = generateToken({email: user.email, role: user.role})
        res.cookie("currentUser", token, {maxAge: 1000} )
        res.status(200).json({message: "sesion iniciada"})
    } catch (error) {
        res.status(500),json({error: "error al iniciar sesion", details: error.message })
    }
})

router.get("/current", (req, res) => {
    const token = req.cookies.currentUser
    if (!token) {
        return res.status(401).json({error: "no tiene permiso"})
    }
    try {
        const user = verityToken(token)
        res.status(200),json(user)
    } catch (error) {
        res.status(500).json({error: " error al obtener el usuario", detail: error.message}) 
    }
})

export default router