import { IPaginatedResponse } from '@business/dtos/serviceOptions'
import { FindAllAdminUsersService } from '@business/services/adminUser/findAll'
import { IAdminUserEntity } from '@domain/entities/adminUser'
import { IError } from '@shared/IError'
import { Either, left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { InputFindAllAdminUsers } from '../../serializers/adminUser/inputFindAll'
import { AbstractUseCase } from '../abstractOperator'

@injectable()
export class FindAllAdminUsersUseCase extends AbstractUseCase<
  InputFindAllAdminUsers,
  Either<IError, IPaginatedResponse<IAdminUserEntity>>
> {
  constructor(
    @inject(FindAllAdminUsersService)
    private findAllAdminUsers: FindAllAdminUsersService
  ) {
    super()
  }

  async run(
    input: InputFindAllAdminUsers
  ): Promise<Either<IError, IPaginatedResponse<IAdminUserEntity>>> {
    this.exec(input)

    const adminUsers = await this.findAllAdminUsers.exec({
      filters: {
        containsLike: input.contains,
      },
      pagination: {
        count: input.count,
        page: input.page,
      },
      paginate: true,
    })

    if (adminUsers.isLeft()) {
      return left(adminUsers.value)
    }

    return right(adminUsers.value.paginatedResponse)
  }
}
