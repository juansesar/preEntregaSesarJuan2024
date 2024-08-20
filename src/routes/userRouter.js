
import {Router} from "express"
import {userModel} from "../models/user.model.js"

const router = Router()

router.get("/", async (req, res) =>{
    try {
        const user = await userModel.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500),json({error: "error al obtener usuarios", details: error.message})
    }
})

router.post("/", async(req, res) => {
    const { first_name, last_name, email, age, password, cart} = req.body
    if (!first_name || !last_name || !email || !age || !password || !cart) {
        return res.status(400).json({error: "falta informacion", details: error.message})
    }
    try {
        const hashPassword = await createHash(password)
        const user = userModel.create({
            first_name,
            last_name,
            email,
            age,
            password : hashPassword,
            cart
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500),json({error: "error al crear usuario", details: error.message})
    }
    
})
export default router