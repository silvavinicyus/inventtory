import { IProductRepository } from '@business/repositories/product/iProductRepository'
import { IProductEntity } from '@domain/entities/product'
import { injectable } from 'inversify'
import { ProductModel } from '@framework/models/product'
import { ITransaction } from './TransactionRepository'

@injectable()
export class ProductRepository implements IProductRepository {
  async create(
    input: IProductEntity,
    trx?: ITransaction
  ): Promise<IProductEntity> {
    const productResult = await ProductModel.create(input, {
      transaction: trx,
    })

    return productResult.get({
      plain: true,
    })
  }
}
