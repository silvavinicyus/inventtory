import { Router } from 'express'
import { CreateProductController } from './create'
import { FindAllProductsController } from './findAll'
import { FindByProductController } from './findBy'
import { UpdateProductQuantityController } from './updateQuantity'

const productRoutes = Router()

const createProduct = new CreateProductController()
const findBYProduct = new FindByProductController()
const findAllProducts = new FindAllProductsController()
const updateProductQuantity = new UpdateProductQuantityController()

productRoutes.post('/', createProduct.handle)
productRoutes.get('/:uuid', findBYProduct.handle)
productRoutes.get('/', findAllProducts.handle)
productRoutes.patch('/:uuid', updateProductQuantity.handle)

export { productRoutes }
