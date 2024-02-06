import '@framework/ioc/inversify.config'
import { FindAllAdminUsersUseCase } from '@root/src/3-useCases/operations/adminUser/findAll'
import { InputFindAllAdminUsers } from '@root/src/3-useCases/serializers/adminUser/inputFindAll'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'
import { Request, Response } from 'express'

export class FindAllAdminUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const useCase = container.get(FindAllAdminUsersUseCase)

      const input = new InputFindAllAdminUsers({
        contains: [
          {
            column: 'email',
            value: (request.query.email as string) || undefined,
          },
          {
            column: 'name',
            value: (request.query.name as string) || undefined,
          },
        ],
        page: request.query.page ? +request.query.page : 0,
        count: request.query.page ? +request.query.page : 10,
      })

      const adminUsers = await useCase.run(input)

      if (adminUsers.isLeft()) throw adminUsers.value

      return response.status(200).json(adminUsers.value)
    } catch (err) {
      console.error(err)

      if (err instanceof IError) {
        return response.status(err.statusCode).json(err.body)
      }

      return response.status(500).json({ error: 'Internal Server Error' })
    }
  }
}
