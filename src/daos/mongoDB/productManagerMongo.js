

export default class ProductManager {
    constructor(model) {
        this.model = model
    }

    async getAll(page = 1, limit = 10, title, sort) {
        try {
          const filter = title ? { 'title': title } : {};
          let sortOrder = {};
          if(sort) sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
          const response = await ProductModel.paginate(filter, { page, limit, sort: sortOrder });
          return response;
        } catch (error) {
          console.log(error);
        }
      }

    async getByID(id){
        try {
            return await this.model.findById(id)
        } catch (error) {
            console.log(error)
        }
    }

    async update(id, obj){
        try {
            return await this.model.findByIdAndUpdate(id, obj, {new : true})
        } catch (error) {
            console.log(error)
        }
    }

    async create(obj){
        try {
            return await this.model.create(obj)
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id){
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            console.log(error)
        }
    }
}