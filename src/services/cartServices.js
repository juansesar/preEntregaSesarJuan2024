import CartManager from "../daos/mongoDB/cartManagerMongo.js"
import { cartModel } from "../daos/mongoDB/models/cart.js"
import ProductManager from "../daos/mongoDB/productManagerMongo.js"
import { ProductModel } from "../daos/mongoDB/models/products.js"
const cartManager = new CartManager(cartModel)
const productManager = new ProductManager(ProductModel)

export const newCartProduct = async (cartId, prodId) => {
  try {
    const existCart = await cartManager.getById(cartId)
    if (!existCart) return null
    const existProd = await productManager.getByID(prodId)
    if (!existProd) return null
    return await cartManager.addProdToCart(cartId, prodId)
  } catch (error) {
    throw new Error(error)
  }
};

export const create = async () => {
  try {
    const newcart = await cartManager.create();
    if (!newcart) return false
    else return newcart
  } catch (error) {
    throw new Error("este?",error)
  }
}

export const getAll = async () => {
  try {
    return await cartManager.getAll()
  } catch (error) {
    throw new Error(error);
  }
}


export const getById = async (id) => {
  try {
    return await cartManager.getById(id)
  } catch (error) {
    throw new Error(error)
  }
}

export const update = async (id, obj) => {
  try {
    return await cartManager.update(id, obj)
  } catch (error) {
    throw new Error(error)
  }
};

export const remove = async (id) => {
  try {
    const cartDel = await cartManager.delete(id);
    if (!cartDel) return false
    else return cartDel
  } catch (error) {
    throw new Error(error)
  }
};

export const removeProdToCart = async (cartId, prodId) => {
  try {
    const existCart = await getById(cartId)
    if (!existCart) return null
    const existProdInCart = await cartManager.existProdInCart(cartId, prodId);
    if (!existProdInCart) return null
    return await cartManager.removeProdToCart(cartId, prodId)
  } catch (error) {
    throw new Error(error)
  }
};

export const updateProdQuantityToCart = async (cartId, prodId, quantity) => {
  try {
    const existCart = await getById(cartId)
    if (!existCart) return null
    const existProdInCart = await cartManager.existProdInCart(cartId, prodId)
    if (!existProdInCart) return null
    return await cartManager.updateProdQuantityToCart(cartId, prodId, quantity)
  } catch (error) {
    throw new Error(error)
  }
};

export const clearCart = async (cartId) => {
  try {
    const existCart = await getById(cartId)
    if (!existCart) return null
    return await cartManager.clearCart(cartId)
  } catch (error) {
    throw new Error(error)
  }
}






