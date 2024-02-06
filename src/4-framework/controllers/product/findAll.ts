import '@framework/ioc/inversify.config'
import { FindAllProductsUseCase } from '@root/src/3-useCases/operations/product/findAll'
import { InputFindAllProducts } from '@root/src/3-useCases/serializers/product/inputFindAll'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class FindAllProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(FindAllProductsUseCase)

      const input = new InputFindAllProducts({
        contains: [
          {
            column: 'name',
            value: (request.query.name as string) || undefined,
          },
        ],
        page: request.query.page ? +request.query.page : 0,
        count: request.query.page ? +request.query.page : 10,
      })

      const products = await useCase.run(input)

      if (products.isLeft()) throw products.value

      return response.status(200).json(products.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
