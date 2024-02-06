import { productRoutes } from '@framework/controllers/product/product'
import { Router } from 'express'

const router = Router()

router.use('/products', productRoutes)

export { router }
