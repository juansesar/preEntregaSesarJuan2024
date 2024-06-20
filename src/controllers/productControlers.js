import * as services from "../services/productServices.js"



export const getAll = async (req, res, next) => {
    try {
        const prods = await services.getAll()
        res.json(prods)
    } catch (error) {
        next(error.message)
    }
}
export const getById = async (req, res, next) => {
    try {
        const { id } = req.params
        const prods = await services.getByID(id)
        if(!prods) res.status(404).json({msj: "product not found"})
        else res.json(prods)
    } catch (error) {
       next(error.message)
    }
}
export const create = async (req, res, next) => {
    try {
        const prods = await services.create(req.body)
        res.json(prods)
    } catch (error) {
        next(error.message)
    }
}
export const update = async (req, res, next) => {
    try {
        const { id } = req.params
        const prods = await services.update( id, req.body)
        res.json(prods)
    } catch (error) {
        next(error.message)
    }
}
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params
        const prods = await services.remove(id)
        res.json(prods)
    } catch (error) {
        next(error.message)
    }
}