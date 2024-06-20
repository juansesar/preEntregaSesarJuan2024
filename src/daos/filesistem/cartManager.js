import ProductManager from "./productManager.js"
import fs from "fs";
const productManager = new ProductManager("./data/products.json")

class
CartManager{
    constructor (path){
        this.path = path 
        this.cartProducts = []
    }

async newCartProduct(idCart, idProd){
    try {
        const newCartProducts = await productManager.getById(idProd)
        // console.log(newCartProducts)
        if(!newCartProducts) throw new Error('Product not found')
        let newCartProduct = await this.getCartProducts()
        const cartExist = await this.getCartProductsById(idCart)
        if(!cartExist) throw new Error('Cart not found')
        const existProdInCart = cartExist.products.find((prod) => prod.product === idProd)
        if(!existProdInCart){
            const prod = {
              id: idProd,
              quantity: 1
            };
            cartExist.products.push(prod)
        } else existProdInCart.quantity += 1
        const updatedCarts = newCartProduct.map((cart) => {
          if(cart.id == idCart) return cartExist
          return cart
        })
        await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
        return cartExist
      } catch (error) {
        throw new Error(error);
      }
    }

async idGenerator(){
    const products = await this.getCartProducts()
    const number = products.length
    const id = number + 1
    return id
}


async createCart() {
    try {
      const cart = {
        id: await this.idGenerator(),
        products: [],
      }
      const carts = await this.getCartProducts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

async getCartProducts() { 
    try {
        if (fs.existsSync(this.path)) {
          const carts = await fs.promises.readFile(this.path, "utf-8")
          const cartsJSON = JSON.parse(carts)
          return cartsJSON;
        } else {
          return []
        }
      } catch (error) {
        throw new Error(error)
      }
    }

async getCartProductsById(id){ 
    try {
      console.log(id)
      const carts = await this.getCartProducts()
      const cart = carts.find((c) => c.id == id)
      if (!cart) return null
      return cart
    } catch (error) {
      throw new Error(error)
    }
  }
}







export default CartManager