import * as services from "../services/cartServices.js"


export const getAll = async (req, res, next) => {
    try {
    const products = await services.getAll();
    res.status(200).json(products);
    }catch (error) {
        next(error.message)
    }}

export const addCart = async (req, res, next) => {
    try {
        const { idProd } = req.params
        const { idCart } = req.params
        const product = await services.newCartProduct(idCart, idProd)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error.mesege});
    }}

export const getById = async (req, res, next) => {
    try {
        const { cid } = req.params
        const product = await services.getCartProductsById(cid); 
        res.status(200).json(product);
    }catch (error) {
        res.status(500).json({msg: error.mesege});
    }}

export const crateCart = ("/", async (req, res) => {
    try {
      res.json(await services.createCart());
    } catch (error) {
      res.status(500).json(error.message);
    }
  });



