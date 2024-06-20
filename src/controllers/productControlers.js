import * as services from "../services/productServices.js"



export const getAll = async (req, res, next) => {
    try {
      const { page, limit, name, sort } = req.query
      const response = await service.getAll(page, limit, name, sort)
      const nextLink = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null
      const prevLink = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null
      res.status(200).json({
        status: 'success',
        payload: response.docs,
        totalPages: response.totalDocs,
        prevPage: response.prevPage,
        nextPage: response.nextPage,
        page,
        hasNextPage: response.hasNextPage,
        hasPrevPage: response.hasPrevPage,
        prevLink,
        nextLink
      })
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