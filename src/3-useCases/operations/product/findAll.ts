import { inject, injectable } from 'inversify'
import { IOutputFindAllProductsDto } from '@business/dtos/product/findAll'
import { FindAllProductsService } from '@business/services/product/findAll'
import { AbstractUseCase } from '../abstractOperator'
import { InputFindAllProducts } from '../../serializers/product/inputFindAll'

@injectable()
export class FindAllProductsUseCase extends AbstractUseCase<
  InputFindAllProducts,
  IOutputFindAllProductsDto
> {
  constructor(
    @inject(FindAllProductsService)
    private findAllProducts: FindAllProductsService
  ) {
    super()
  }

  async run(input: InputFindAllProducts): Promise<IOutputFindAllProductsDto> {
    this.exec(input)

    const products = await this.findAllProducts.exec({
      filters: {
        containsLike: input.contains,
      },
      pagination: {
        count: input.count,
        page: input.page,
      },
    })

    return products
  }
}
