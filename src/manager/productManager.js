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
    
    async getProducts(limit){
        try{
            
            const products = await fs.promises.readFile(this.path, "utf8")
            const array = JSON.parse(products)
            if (limit){
                return array.filter((p) => {
                    const newArray = []
                    if(indexOf(p) != -1 || indexOf(p) != null || indexOf(p) <= limit+1) {
                        newArray.push(p)
                        return newArray
                    }})
                
                 
            }else{
            return JSON.parse(products)}
        }catch (error) {
            console.log(error);
          }
        }
        

    async getProductById(id) {
        try{

            const products = await this.getProducts()
            const product = products.find((p) => p.id == id) 
            console.log(product)
            return product 
        }catch (error) {
            console.log(error);
          }   
    }

    async newProduct(prod){ 
        try {
            
            const product = { 
                id : await this.idGenerator() ,
                status : true,
                ...prod,
            }
            this.productId = product.id
            const products = await this.getProducts()
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            console.log (products)
            return products
        }catch(error) {
            console.log(error);
          }
    }

    async updateProduct(id, obj){
        try{
            const products = await this.getProducts() 
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
            console.log(error);
          }
        
        
    }

    async deleteProduct (id){ 
        try{
            let products = await this.getProducts() 
            let newArrayProducts = products.filter((p) => p.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts))
            return this.getProducts()
        }catch (error) {
            console.log(error);
          }  
    }

}

export default ProductManager

