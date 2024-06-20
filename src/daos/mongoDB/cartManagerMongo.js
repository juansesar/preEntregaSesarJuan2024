

export default class CartManager {
    constructor(model) {
        this.model = model
    }
    async create() {
    try {
      return await this.model.create({
        products: [],
      });
    } catch (error) {
      console.log("este?",error)
    }
  }

  async getAll() {
    try {
      return await this.model.find()
    } catch (error) {
      console.log(error)
    }
  }

  async getById(id) {
    try {
      return await this.model.findById(id).populate("products.product")
    } catch (error) {
      console.log(error)
    }
  }

  async delete(id) {
    try {
      return await this.model.findByIdAndDelete(id)
    } catch (error) {
      console.log(error)
    }
  }

  async existProdInCart(cartId, prodId){
    try {
      console.log("manager1",cartId)
      console.log("manager1", prodId)
      return await this.model.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } }
      })
    } catch (error) {
        console.log("exists",error)
    }
  }
  async addProdToCart(cartId, prodId) {
    try {
      console.log("manager",cartId)
      console.log("manager", prodId)
      const existProdInCart = await this.existProdInCart(cartId, prodId);
      console.log("existProdInCart", existProdInCart)
        if(existProdInCart){
          return await this.model.findOneAndUpdate(
            { _id: cartId, 'products.product': prodId },
            { $set: { 'products.$.quantity': existProdInCart.products[0].quantity + 1 } },
            { new: true }
          );
        } else {
          return await this.model.findByIdAndUpdate(
            cartId,
            { $push: { products: { products: prodId } } },
            { new: true }
          )
        }
    } catch (error) {
      console.log("manager", error);
    }
  }

  async removeProdToCart(cartId, prodId) {
    try {
      return await this.model.findByIdAndUpdate(
        { _id: cartId },
        { $pull: { products: { product: prodId } } },
        { new: true }
      )
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await this.model.findByIdAndUpdate(id, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProdQuantityToCart(cartId, prodId, quantity) {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cartId, 'products.product': prodId },
        { $set: { 'products.$.quantity': quantity } },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async clearCart(cartId) {
    try {
     return await this.model.findOneAndUpdate(
      { _id: cartId },
      { $set: { products: [] } },
      { new: true }
     )
    } catch (error) {
      console.log(error);
    }
  }
}
