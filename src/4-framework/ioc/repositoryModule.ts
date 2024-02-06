import {
  IAdminUserRepository,
  IAdminUserRepositoryToken,
} from '@business/repositories/adminUser/iAdminUserRepository'
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@business/repositories/product/iProductRepository'
import { AdminUserRepository } from '@framework/repositories/adminUserRepository'
import { ProductRepository } from '@framework/repositories/productRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IProductRepository>(IProductRepositoryToken).to(ProductRepository)
  bind<IAdminUserRepository>(IAdminUserRepositoryToken).to(AdminUserRepository)
})
