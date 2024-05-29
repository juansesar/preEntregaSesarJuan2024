import express from "express";
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import {__dirname} from "./utils.js"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import ProductManager from "./manager/productManager.js";

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

    console.log("conectado uija")
    socket.on("newProductEmit", async(prod) => {
        await productManager.newProduct(prod)
        socketServer.emit("listProducts", await productManager.getProducts())
        
    })
    
} )

