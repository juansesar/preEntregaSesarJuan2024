import {Router} from "express";
import ProductManager from "../daos/filesistem/productManager.js";
import productValidator from "../daos/filesistem/productValidator.js"
import {__dirname} from "../utils.js"


const productRouter = Router()
const productManager = new ProductManager(`${__dirname}/data/products.json`)

productRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query
        const products = await productManager.getAll(limit);
        res.status(200).json(products)
    }catch (error) {
        res.status(500).json({msg: error.mesege});
        console.log(error);
    }})

productRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await productManager.getById(id);
        
        res.status(200).json(product);
        }catch (error) {
            res.status(500).json({msg: error.mesege});
        }})

productRouter.post("/", productValidator, async (req, res) => {
    try {
        const prod = req.body;
        const product = await productManager.create(prod);
        res.json(product);
    } catch (error) { res.status(500).json({msg: error.mesege});
    }})

productRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const obj = req.body
        const product = await productManager.update(id, obj);
        res.status(200).json(product);
    } catch (error) { res.status(500).json({msg: error.mesege});
    }})

productRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await productManager.delete(id);
        res.status(200).json(product);
    } catch (error) { res.status(500).json({msg: error.mesege});
    }})

export default productRouter