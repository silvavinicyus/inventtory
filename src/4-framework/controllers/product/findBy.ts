import '@framework/ioc/inversify.config'
import { FindByProductUseCase } from '@root/src/3-useCases/operations/product/findBy'
import { InputFindByProduct } from '@root/src/3-useCases/serializers/product/inputFindBy'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class FindByProductController {
  async handle(request: Request, response: Response) {
    try {
      const useCase = container.get(FindByProductUseCase)

      const input = new InputFindByProduct({
        uuid: request.params.uuid,
      })

      const product = await useCase.run(input)

      if (product.isLeft()) {
        throw product.value
      }

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
