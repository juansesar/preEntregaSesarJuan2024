import fs from "fs";


class ProductManager { 
    constructor(path) {
        this.path = path
        
    }

    async idGenerator(){
        const products = await this.getProducts()
        const number = products.length
        const id = number + 1
        return id
    }
    
    async getAll(limit){
        try{
            
            const products = await fs.promises.readFile(this.path, "utf8")
            const array = JSON.parse(products)
            if (limit){
                return array.filter((p) => {
                    const newArray = []
                    if( array.indexOf(p) > -1 && array.indexOf(p) != null && array.indexOf(p) < limit) {
                        newArray.push(p)
                        console.log(limit)
                        console.log(newArray)
                        return newArray
                    }})
                
                 
            }else{
            return JSON.parse(products)}
        }catch (error) {
            throw new Error(error)
          }
        }
        

    async getById(id) {
        try{

            const products = await this.getAll()
            const product = products.find((p) => p.id == id) 
            console.log(product)
            if (product) {return product }
            return null
        }catch (error) {
            throw new Error(error)
          }   
    }

    async create(prod){ 
        try {
            
            const product = { 
                id : await this.idGenerator() ,
                status : true,
                ...prod,
            }
            this.productId = product.id
            const products = await this.getAll()
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log (products)
            return products
        }catch(error) {
            throw new Error(error)
          }
    }

    async upload(id, obj){
        try{
            const products = await this.getAll() 
            let product = products.find((p) => p.id == id)
            product = { 
                id : product.id,
                status : true,
                ...obj,
                }
            const newArrayProducts = products.filter((p) => p.id != id)
            newArrayProducts.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            return this.getProducts()

        }catch (error) {
            throw new Error(error)
          }
        
        
    }

    async delete (id){ 
        try{
            let products = await this.getAll() 
            let newArrayProducts = products.filter((p) => p.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            return this.getProducts()
        }catch (error) {
            throw new Error(error)
          }  
    }

}

export default ProductManager

