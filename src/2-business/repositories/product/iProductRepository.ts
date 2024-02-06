import { ITransaction } from '@business/dtos/transaction/create'
import { IProductEntity } from '@domain/entities/product'

export const IProductRepositoryToken = Symbol.for('IProductRepositoryToken')

export interface IProductRepository {
  create(input: IProductEntity, trx?: ITransaction): Promise<IProductEntity>
}
