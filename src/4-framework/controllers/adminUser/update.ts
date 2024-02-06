import '@framework/ioc/inversify.config'
import { UpdateAdminUserUseCase } from '@root/src/3-useCases/operations/adminUser/update'
import { InputUpdateAdminUser } from '@root/src/3-useCases/serializers/adminUser/inputUpdate'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class UpdateAdminUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(UpdateAdminUserUseCase)

      const input = new InputUpdateAdminUser({
        uuid: request.params.uuid,
        name: (request.body.name as string) || undefined,
        email: (request.body.email as string) || undefined,
      })

      const adminUser = await useCase.run(input)

      if (adminUser.isLeft()) {
        throw adminUser.value
      }

      return response.status(200).json(adminUser.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
