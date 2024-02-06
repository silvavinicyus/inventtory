import { inject, injectable } from 'inversify'
import {
  IInputCreateProductDto,
  IOutputCreateProductDto,
} from '@business/dtos/product/create'
import { ProductEntity, IInputProductEntity } from '@domain/entities/product'
import {
  IUniqueIdentifierExternalService,
  IUniqueIdentifierExternalServiceToken,
} from '@business/extServices/uniqueIdentifier/iUniqueIdentifier'
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@business/repositories/product/iProductRepository'
import { ITransaction } from '@business/dtos/transaction/create'
import { left, right } from '@shared/either'
import { ProductErrors } from '@business/errors/product'
import { IAbstractService } from '../abstractService'

@injectable()
export class CreateProductService
  implements IAbstractService<IInputCreateProductDto, IOutputCreateProductDto>
{
  constructor(
    @inject(IUniqueIdentifierExternalServiceToken)
    private uniqueIdentifier: IUniqueIdentifierExternalService,
    @inject(IProductRepositoryToken)
    private productRepository: IProductRepository
  ) {}

  async exec(
    props: IInputProductEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateProductDto> {
    try {
      const productEntity = ProductEntity.create(props)

      const productResult = await this.productRepository.create(
        {
          ...productEntity.value.export(),
          uuid: this.uniqueIdentifier.create(),
        },
        trx
      )

      return right(productResult)
    } catch (err) {
      console.error(err)
      return left(ProductErrors.creationFailed())
    }
  }
}
