const productValidator = (rec, res, next) =>{
    if( rec.body.title === undefined ||
        rec.body.description === undefined ||
        rec.body.code === undefined ||
        rec.body.price === undefined ||
        rec.body.stock === undefined || 
        rec.body.category === undefined || 
        rec.body.thumbnails === undefined
    ) res.status(404).json({msg: "faltan datos"}) 
    else next()
}

export default productValidator


