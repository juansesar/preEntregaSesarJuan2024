const socket = io();

const title = document.getElementById("title")
const description = document.getElementById("description")
const code = document.getElementById("code")
const price = document.getElementById("price")
const stock = document.getElementById("stock")
const category = document.getElementById("category")
const thumbnails = document.getElementById("thumbnails")
const send = document.getElementById("send")
const contenedorProductsHome = document.getElementById("contenedorProductsHome")

const FormProducts = document.getElementById("productsFromForm")


socket.on("showProducts", (prod) => {
    contenedorProductsHome.innerHTML = prod.map((p) => {
        return `<p> producto : ${p.title}</p> 
                <p> descripcion : ${p.description}</p> 
                <p> codigo : ${p.code}</p> 
                <p> precio : ${p.price}</p> 
                <p> stock : ${p.stock}</p> 
                <p> imagen : ${p.thumbnails}</p>
                -------------------------`
    }).join(" ")
})

send.addEventListener("click", () => {
    const newProduct = {
        title: title.value,
        description: description.value,
        code: code.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnails: thumbnails.value
    }

    socket.emit("newProductEmit", newProduct)
    title.value = ""
    description.value = ""
    code.value = ""
    price.value = ""
    stock.value = ""
    category.value = ""
    thumbnails.value = ""
})

socket.on("listProducts", (prod) => {
    FormProducts.innerHTML = prod.map((p) => {
        return `<p> producto : ${p.title}</p> 
                <p> descripcion : ${p.description}</p> 
                <p> codigo : ${p.code}</p> 
                <p> precio : ${p.price}</p> 
                <p> stock : ${p.stock}</p> 
                <p> imagen : ${p.thumbnails}</p>
                <button id="deleteBtn", onClick(${p.id})>borrar</button> </br>
                -------------------------`
    }


    ).join(" ")
    
    
    const deleteBtn = document.getElementById("deleteBtn")
    deleteBtn.addEventListener("click", (id) => {
        socket.emit("deleteEvent", (id))
    })
})

