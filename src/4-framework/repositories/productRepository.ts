import { IProductRepository } from '@business/repositories/product/iProductRepository'
import { IProductEntity } from '@domain/entities/product'
import { injectable } from 'inversify'
import { ProductModel } from '@framework/models/product'
import { IInputFindByProductDto } from '@business/dtos/product/findBy'
import { IInputFindAllProductsDto } from '@business/dtos/product/findAll'
import { IPaginatedResponse } from '@business/dtos/serviceOptions'
import { createFindAllProps } from '@framework/utils/repositoryPropsBuilder'
import { ITransaction } from './TransactionRepository'

@injectable()
export class ProductRepository implements IProductRepository {
  async findAll(
    input: IInputFindAllProductsDto
  ): Promise<IPaginatedResponse<IProductEntity>> {
    const props = createFindAllProps(input)

    const products = await ProductModel.findAndCountAll(props)

    return {
      count: products.count,
      items: products.rows.map((product) => product.get({ plain: true })),
      page: input.pagination.page,
      perPage: input.pagination.count,
    }
  }

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
