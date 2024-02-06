import { Router } from 'express'
import { CreateProductController } from './create'
import { FindByProductController } from './findBy'
import { FindAllProductsController } from './findAll'

const productRoutes = Router()

const createProduct = new CreateProductController()
const findBYProduct = new FindByProductController()
const findAllProducts = new FindAllProductsController()

productRoutes.post('/', createProduct.handle)
productRoutes.get('/:uuid', findBYProduct.handle)
productRoutes.get('/', findAllProducts.handle)

export { productRoutes }
