import {
  IProductRepository,
  IProductRepositoryToken,
} from '@business/repositories/product/iProductRepository'
import { ProductRepository } from '@framework/repositories/productRepository'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IProductRepository>(IProductRepositoryToken).to(ProductRepository)
})
