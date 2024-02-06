import '@framework/ioc/inversify.config'
import { DeleteAdminUserUseCase } from '@root/src/3-useCases/operations/adminUser/delete'
import { InputDeleteAdminUser } from '@root/src/3-useCases/serializers/adminUser/inputDelete'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class DeleteAdminUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(DeleteAdminUserUseCase)

      const input = new InputDeleteAdminUser({
        uuid: request.params.uuid,
      })

      const result = await useCase.run(input)

      if (result.isLeft()) {
        throw result.value
      }

      return response.status(204).json()
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
