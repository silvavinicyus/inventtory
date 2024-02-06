import { Router } from 'express'
import { CreateProductController } from './create'

const productRoutes = Router()

const productController = new CreateProductController()

productRoutes.post('/', productController.handle)

export { productRoutes }
