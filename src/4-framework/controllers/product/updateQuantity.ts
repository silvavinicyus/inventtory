import '@framework/ioc/inversify.config'
import { UpdateQuantityUseCase } from '@root/src/3-useCases/operations/product/updateQuantity'
import { InputUpdateQuantity } from '@root/src/3-useCases/serializers/product/inputUpdateQuantity'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { InventotyOperation } from '@shared/utils/constants'
import { Request, Response } from 'express'

export class UpdateProductQuantityController {
  async handle(request: Request, response: Response) {
    try {
      const useCase = container.get(UpdateQuantityUseCase)

      const input = new InputUpdateQuantity({
        uuid: request.params.uuid,
        operation: InventotyOperation[request.body.operation],
        quantity: +request.body.quantity,
      })

      const product = await useCase.run(input)

      if (product.isLeft()) throw product.value

      return response.status(200).json(product.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
