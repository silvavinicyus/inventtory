import { Router } from 'express'
import { CreateAdminUserController } from './create'
import { FindAllAdminUsersController } from './findAll'
import { UpdateAdminUserController } from './update'
import { DeleteAdminUserController } from './delete'

const adminUserRoutes = Router()

const createAdminUser = new CreateAdminUserController()
const findAllAdminUsers = new FindAllAdminUsersController()
const updateAdminUser = new UpdateAdminUserController()
const deleteAdminUser = new DeleteAdminUserController()

adminUserRoutes.post('/', createAdminUser.handle)
adminUserRoutes.get('/', findAllAdminUsers.handle)
adminUserRoutes.put('/:uuid', updateAdminUser.handle)
adminUserRoutes.delete('/:uuid', deleteAdminUser.handle)

export { adminUserRoutes }
