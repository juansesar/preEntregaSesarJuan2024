import express from "express";
import productRouter from "./routes/productRouter.js"
import cartRouter from "./routes/cartRouter.js"
import {__dirname} from "./utils.js"

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static(__dirname + '/public'))
app.use("/products", productRouter )
app.use("/cart", cartRouter )

const PORT = 8080

app.listen(PORT, ()=> console.log("escuchando"))
