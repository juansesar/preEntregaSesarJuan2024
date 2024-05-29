import {Router} from "express"
import {__dirname} from "../utils.js"

const viewRouter = Router()

viewRouter.get("/", (req, res) =>{
    res.render("home")
})

viewRouter.get("/realTimeProducts", (req, res) =>{
    res.render("realTimeProducts")
})

export default viewRouter