import { IOutputCreateProductDto } from '@business/dtos/product/create'
import { CreateProductService } from '@business/services/product/create'
import { inject } from 'inversify'
import { InputCreateProduct } from '../../serializers/product/inputCreate'
import { AbstractUseCase } from '../abstractOperator'

export class CreateProductUseCase extends AbstractUseCase<
  InputCreateProduct,
  IOutputCreateProductDto
> {
  constructor(
    @inject(CreateProductService)
    private createProduct: CreateProductService
  ) {
    super()
  }

  async run(input: InputCreateProduct): Promise<IOutputCreateProductDto> {
    this.exec(input)

    const product = await this.createProduct.exec({
      ...input,
    })

    return product
  }
}
