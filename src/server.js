import express from "express";
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import ProductManager from "./daos/filesistem/productManager.js"
import { initMongoDB } from "./daos/mongoDB/connect.js"
import { errorHandler } from "./middleware/errorHandler.js"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import sessionRoutes from "./routes/sessionRouter.js"
import userRoutes from "./routes/userRouter.js"
import morgan from "morgan"
import passport from "passport"
import { initializePassport } from "./config/passportConfig.js"
import routes from "./routes/index.js"
import { config } from "./config/config.js"


const productManager = new ProductManager(`${__dirname}/data/products.json`)
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(__dirname + '/public'))
app.use("/products", productRouter )
app.use("/cart", cartRouter )
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", __dirname + '/views')
app.use(errorHandler)
app.use(cookieParser)
// app.use(express.static:("public"))
app.use(morgan("dev"))

initializePassport();
app.use(passport.initialize())

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB")
  })
  .catch((error) => {
    console.log(error);
  });


app.use("/api/session", sessionRoutes)
app.use("/api/user", userRoutes)
app.use("/api", routes)

initMongoDB()
const PORT = 8080

const httpServer= app.listen(PORT, ()=> console.log("escuchando"))
const socketServer = new Server(httpServer)

app.get("/", (req, res) => {
    res.render("home")
})

app.get("/realTimeProducts", (req, res) => {
    res.render("realTimeProducts")
})

socketServer.on("connection", async (socket) => {
    socket.emit("showProducts", await productManager.getProducts())
    socketServer.emit("listProducts", await productManager.getProducts())
    socket.on("deleteEvent", async(id) =>{
        await productManager.deleteProduct(id)
    })

    console.log("conectado uija")
    socket.on("newProductEmit", async(prod) => {
        await productManager.newProduct(prod)
        socketServer.emit("listProducts", await productManager.getProducts())
        
    })
    
} )

