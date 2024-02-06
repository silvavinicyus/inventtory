import { adminUserRoutes } from '@framework/controllers/adminUser/adminUser'
import { productRoutes } from '@framework/controllers/product/product'
import { Router } from 'express'

const router = Router()

router.use('/products', productRoutes)
router.use('/admins', adminUserRoutes)

export { router }
