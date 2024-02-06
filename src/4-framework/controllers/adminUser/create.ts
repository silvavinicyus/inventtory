import '@framework/ioc/inversify.config'
import { CreateAdminUserUseCase } from '@root/src/3-useCases/operations/adminUser/create'
import { InputCreateAdminUser } from '@root/src/3-useCases/serializers/adminUser/inputCreate'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class CreateAdminUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(CreateAdminUserUseCase)

      const input = new InputCreateAdminUser({
        name: request.body.name,
        email: request.body.email,
      })

      const adminUser = await useCase.run(input)

      if (adminUser.isLeft()) {
        throw adminUser.value
      }

      return response.status(201).json(adminUser.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
