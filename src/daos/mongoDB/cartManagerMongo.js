

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
      console.log(error)
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
      return await this.model.findOne({
        _id: cartId,
        products: { $elemMatch: { product: prodId } }
      })
    } catch (error) {
        console.log(error)
    }
  }}