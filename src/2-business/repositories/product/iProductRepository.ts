import { IInputFindAllProductsDto } from '@business/dtos/product/findAll'
import { IInputFindByProductDto } from '@business/dtos/product/findBy'
import { IPaginatedResponse } from '@business/dtos/serviceOptions'
import { ITransaction } from '@business/dtos/transaction/create'
import { IProductEntity } from '@domain/entities/product'

export const IProductRepositoryToken = Symbol.for('IProductRepositoryToken')

export interface IProductRepository {
  create(input: IProductEntity, trx?: ITransaction): Promise<IProductEntity>
  findBy(input: IInputFindByProductDto): Promise<IProductEntity>
  findAll(
    input: IInputFindAllProductsDto
  ): Promise<IPaginatedResponse<IProductEntity>>
}
