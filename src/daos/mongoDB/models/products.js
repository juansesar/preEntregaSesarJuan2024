import { Schema, model } from "mongoose"

const productSchema = new Schema({
    title: {type: String, required: true, max: 30, index: true},
    description: {type: String, required: true},
    code: {type: Number, required: true},
    price: {type: Number, required: true, index: true},
    stock: {type: Number, required: true},
    category: {type: String, required: true, max: 30},
    thumbnails: {type: String, required: true, max: 30}
},
{versionKey : false}
) 

export const ProductModel = model("products", productSchema)