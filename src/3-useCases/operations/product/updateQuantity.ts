import { inject, injectable } from 'inversify'
import { FindByProductService } from '@business/services/product/findBy'
import { UpdateProductService } from '@business/services/product/update'
import { left } from '@shared/either'
import { InventotyOperation } from '@shared/utils/constants'
import { ProductErrors } from '@business/errors/product'
import { AbstractUseCase } from '../abstractOperator'
import {
  IOutputUpdateQuantity,
  InputUpdateQuantity,
} from '../../serializers/product/inputUpdateQuantity'

@injectable()
export class UpdateQuantityUseCase extends AbstractUseCase<
  InputUpdateQuantity,
  IOutputUpdateQuantity
> {
  constructor(
    @inject(FindByProductService)
    private findByProduct: FindByProductService,
    @inject(UpdateProductService)
    private updateProduct: UpdateProductService
  ) {
    super()
  }

  async run(input: InputUpdateQuantity): Promise<IOutputUpdateQuantity> {
    this.exec(input)

    const product = await this.findByProduct.exec({
      where: {
        column: 'uuid',
        value: input.uuid,
      },
    })

    if (product.isLeft()) {
      return left(product.value)
    }

    if (input.operation === InventotyOperation.REMOVE) {
      const isPossibleToRemove = this.validateQuantityRemoval(
        product.value.quantity,
        input.quantity
      )

      if (!isPossibleToRemove) {
        return left(ProductErrors.insufficientQuantity())
      }
    }

    const newQuantity =
      input.operation === InventotyOperation.ADD
        ? product.value.quantity + input.quantity
        : product.value.quantity - input.quantity

    const updatedProduct = await this.updateProduct.exec(
      {
        quantity: newQuantity,
      },
      {
        column: 'id',
        value: product.value.id,
      }
    )

    return updatedProduct
  }

  private validateQuantityRemoval(
    productQuantity: number,
    quantityToRemove: number
  ): boolean {
    return productQuantity >= quantityToRemove
  }
}
