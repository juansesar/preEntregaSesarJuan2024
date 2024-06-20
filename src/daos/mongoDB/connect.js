import mongoose from "mongoose"

const connectionStr = "mongodb+srv://juanmsesar:Sofi%402012@sesar.e7b0x92.mongodb.net/?retryWrites=true&w=majority&appName=sesar"

export const initMongoDB = async() => {
    try {
        await mongoose.connect(connectionStr)
        console.log("conectado a la base de datos mongoose")
    } catch (error) {
        console.log(`ERROR => ${error}`)
    }
}

