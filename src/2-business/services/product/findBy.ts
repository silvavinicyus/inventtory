import { inject, injectable } from 'inversify'
import {
  IInputFindByProductDto,
  IOutputFindByProductDto,
} from '@business/dtos/product/findBy'
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@business/repositories/product/iProductRepository'
import { left, right } from '@shared/either'
import { ProductErrors } from '@business/errors/product'
import { IAbstractService } from '../abstractService'

@injectable()
export class FindByProductService
  implements IAbstractService<IInputFindByProductDto, IOutputFindByProductDto>
{
  constructor(
    @inject(IProductRepositoryToken)
    private productRepository: IProductRepository
  ) {}

  async exec(props: IInputFindByProductDto): Promise<IOutputFindByProductDto> {
    try {
      const product = await this.productRepository.findBy(props)

      if (!product) {
        console.error('Error: Product Not Found')
        return left(ProductErrors.notFound())
      }

      return right(product)
    } catch (err) {
      console.error(err)
      return left(ProductErrors.loadFailed())
    }
  }
}
