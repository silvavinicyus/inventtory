import '@framework/ioc/inversify.config'
import { CreateProductUseCase } from '@root/src/3-useCases/operations/product/create'
import { InputCreateProduct } from '@root/src/3-useCases/serializers/product/inputCreate'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(CreateProductUseCase)

      const input = new InputCreateProduct({
        name: request.body.name,
        description: request.body.description,
        quantity: +request.body.quantity,
        bar_code: request.body.bar_code,
      })

      const product = await useCase.run(input)

      if (product.isLeft()) {
        throw product.value
      }

      return response.status(201).json(product.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
