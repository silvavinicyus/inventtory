import { inject, injectable } from 'inversify'
import { IOutputFindByProductDto } from '@business/dtos/product/findBy'
import { FindByProductService } from '@business/services/product/findByProductService'
import { AbstractUseCase } from '../abstractOperator'
import { InputFindByProduct } from '../../serializers/product/inputFindBy'

@injectable()
export class FindByProductUseCase extends AbstractUseCase<
  InputFindByProduct,
  IOutputFindByProductDto
> {
  constructor(
    @inject(FindByProductService)
    private findByProduct: FindByProductService
  ) {
    super()
  }

  async run(input: InputFindByProduct): Promise<IOutputFindByProductDto> {
    this.exec(input)

    const product = await this.findByProduct.exec({
      where: {
        column: 'uuid',
        value: input.uuid,
      },
    })

    return product
  }
}
