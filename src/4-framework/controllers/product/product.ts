import { Router } from 'express'
import { CreateProductController } from './create'
import { FindByProductController } from './findBy'

const productRoutes = Router()

const createProduct = new CreateProductController()
const findBYProduct = new FindByProductController()

productRoutes.post('/', createProduct.handle)
productRoutes.get('/:uuid', findBYProduct.handle)

export { productRoutes }
