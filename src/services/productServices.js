import ProductManager from "../daos/mongoDB/productManagerMongo.js"
import { ProductModel } from "../daos/mongoDB/models/products.js"
const productManager = new ProductManager(ProductModel)

// import { __dirname } from '../utils.js'
// import ProductManager from '../daos/filesistem/productManagerjs'
// const productManager = new ProductManager(`${__dirname}/daos/filesistem/data/products.json`)

export const getAll =  async () => {
    try {
        return await productManager.getAll()
    } catch (error) {
        throw new Error(error)
    }
}

export const getByID =  async (id) => {
    try {
        return await productManager.getByID(id)
    } catch (error) {
        throw new Error(error)
    }
}
export const create =  async (obj) => {
    try {
        return await productManager.create(obj)
    } catch (error) {
        throw new Error(error)
    }
}

export const update =  async (id, obj) => {
    try {
        return await productManager.update(id, obj)
    } catch (error) {
        throw new Error(error)
    }
} 

export const remove =  async (id) => {
    try {
        return await productManager.delete(id)
    } catch (error) {
        throw new Error(error)
    }
}