import { IInputFindAllProductsDto } from '@business/dtos/product/findAll'
import { IInputFindByProductDto } from '@business/dtos/product/findBy'
import { IPaginatedResponse } from '@business/dtos/serviceOptions'
import { ITransaction } from '@business/dtos/transaction/create'
import { IProductEntity, IProductEntityKeys } from '@domain/entities/product'
import { IWhere } from '../where'

export const IProductRepositoryToken = Symbol.for('IProductRepositoryToken')

export type updateWhereProduct = IWhere<
  keyof IProductEntityKeys,
  string | number
>

export interface IInputUpdateProduct {
  updateWhere: updateWhereProduct
  newData: Partial<IProductEntity>
}

export interface IProductRepository {
  create(input: IProductEntity, trx?: ITransaction): Promise<IProductEntity>
  findBy(input: IInputFindByProductDto): Promise<IProductEntity>
  findAll(
    input: IInputFindAllProductsDto
  ): Promise<IPaginatedResponse<IProductEntity>>
  update(
    input: IInputUpdateProduct,
    trx?: ITransaction
  ): Promise<Partial<IProductEntity>>
}
