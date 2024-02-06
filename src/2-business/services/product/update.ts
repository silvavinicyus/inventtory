import {
  IInputUpdateProductDto,
  IOutputUpdateProductDto,
} from '@business/dtos/product/update'
import { ITransaction } from '@business/dtos/transaction/create'
import { ProductErrors } from '@business/errors/product'
import {
  IProductRepository,
  IProductRepositoryToken,
  updateWhereProduct,
} from '@business/repositories/product/iProductRepository'
import { ProductEntity } from '@domain/entities/product'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractService } from '../abstractService'

@injectable()
export class UpdateProductService
  implements IAbstractService<IInputUpdateProductDto, IOutputUpdateProductDto>
{
  constructor(
    @inject(IProductRepositoryToken)
    private productRepository: IProductRepository
  ) {}

  async exec(
    props: IInputUpdateProductDto,
    updateWhere: updateWhereProduct,
    trx?: ITransaction
  ): Promise<IOutputUpdateProductDto> {
    try {
      const productEntity = ProductEntity.update(props)

      const productResult = await this.productRepository.update(
        {
          newData: productEntity.value.export(),
          updateWhere,
        },
        trx
      )

      return right(productResult)
    } catch (err) {
      console.error(err)
      return left(ProductErrors.updateFailed())
    }
  }
}
