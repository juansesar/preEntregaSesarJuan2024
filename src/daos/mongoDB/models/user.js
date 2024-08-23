import {Schema, model} from "mongoose"

const userSchema = new Schema ({
    first_name: { type: String, require: true},
    last_name: { type: String, require: true},
    email: { type: String, require: true, unique: true },
    age: { type: Number, require: true},
    password: { type: String, require: true},
    // cart: { type: Number, require: true}, esto no se
    role: { type: String, enum: ["admin", "user"], default: "user"}
})

export const userModel = model("user", userSchema)