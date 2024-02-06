import { IProductRepository } from '@business/repositories/product/iProductRepository'
import { IProductEntity } from '@domain/entities/product'
import { injectable } from 'inversify'
import { ProductModel } from '@framework/models/product'
import { IInputFindByProductDto } from '@business/dtos/product/findBy'
import { ITransaction } from './TransactionRepository'

@injectable()
export class ProductRepository implements IProductRepository {
  async findBy(input: IInputFindByProductDto): Promise<IProductEntity> {
    const product = await ProductModel.findOne({
      where: {
        [input.where.column]: input.where.value,
      },
    })

    if (!product) {
      return void 0
    }

    return product.get({ plain: true })
  }

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
