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
        const newCartProducts = await productManager.getProductById(idProd)
        // console.log(newCartProducts)
        if(!newCartProducts) throw new Error('Product not found')
        let newCartProduct = await this.getCartProducts()
        const cartExist = await this.getCartProductsById(idCart)
        if(!cartExist) throw new Error('Cart not found')
        const existProdInCart = cartExist.products.find((prod) => prod.product === idProd)
        if(!existProdInCart){
            const prod = {
              product: idProd,
              quantity: 1
            };
            cartExist.products.push(prod)
        } else existProdInCart.quantity += 1
        const updatedCarts = newCartProduct.map((cart) => {
          if(cart.id === idCart) return cartExist
          return cart
        })
        await fs.promises.writeFile(this.path, JSON.stringify(updatedCarts));
        return cartExist
      } catch (error) {
        console.log(error);
      }
    }

async idGenerator(){
    const products = await this.getProducts()
    const number = products.length
    const id = number + 1
    return id
}


async createCart() {
    try {
      const cart = {
        id: this.idGenerator(),
        products: [],
      }
      const carts = await this.getCartProducts();
      carts.push(cart);
      await fs.promises.writeFile(this.path, JSON.stringify(carts));
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

async getCartProducts () { 
    try {
        if (fs.existsSync(this.path)) {
          const carts = await fs.promises.readFile(this.path, "utf-8");
          const cartsJSON = JSON.parse(carts);
          return cartsJSON;
        } else {
          return [];
        }
      } catch (error) {
        console.log(error);
      }
    }

async getCartProductsById(id){ 
    try {
      const carts = await this.getCartProducts();
      const cart = carts.find((c) => c.id === id);
      if (!cart) return null;
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
}







export default CartManager