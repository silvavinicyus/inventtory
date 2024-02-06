import { inject, injectable } from 'inversify'
import {
  IInputFindAllProductsDto,
  IOutputFindAllProductsDto,
} from '@business/dtos/product/findAll'
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@business/repositories/product/iProductRepository'
import { left, right } from '@shared/either'
import { ProductErrors } from '@business/errors/product'
import { IAbstractService } from '../abstractService'

@injectable()
export class FindAllProductsService
  implements
    IAbstractService<IInputFindAllProductsDto, IOutputFindAllProductsDto>
{
  constructor(
    @inject(IProductRepositoryToken)
    private productRepository: IProductRepository
  ) {}

  async exec(
    props: IInputFindAllProductsDto
  ): Promise<IOutputFindAllProductsDto> {
    try {
      const products = await this.productRepository.findAll(props)

      return right(products)
    } catch (err) {
      console.error(err)
      return left(ProductErrors.loadFailed())
    }
  }
}
