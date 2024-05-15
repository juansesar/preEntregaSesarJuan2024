
import {Router} from "express";
import CartManager from "../manager/cartManager.js";
import {__dirname} from "../utils.js"

const cartRouter = Router()
const cartManager = new CartManager(`${__dirname}/data/cart.json`)

cartRouter.get ("/", async (req, res) => {
    try {
    const products = await cartManager.getCartProducts();
    res.status(200).json(products);
    }catch (error) {
        res.status(500).json({msg: error.mesege});
    }})

cartRouter.post("/:idCart/product/:idProd", async (req, res, next) => {
    try {
        const { idProd } = req.params
        const { idCart } = req.params
        const product = await cartManager.newCartProduct(idCart, idProd)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.mesege});
    }})

cartRouter.get("/:cid", async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const product = await cartManager.getCartProductsById(id); 
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({msg: error.mesege});
    }})

cartRouter.post("/", async (req, res) => {
    try {
      res.json(await cartManager.createCart());
    } catch (error) {
      res.status(500).json(error.message);
    }
  });



export default cartRouter
