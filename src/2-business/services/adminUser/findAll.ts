import { inject, injectable } from 'inversify'
import {
  IInputFindAllAdminUsersDto,
  IOutputFindAllAdminUsersDto,
} from '@business/dtos/adminUser/findAll'
import {
  IAdminUserRepository,
  IAdminUserRepositoryToken,
} from '@business/repositories/adminUser/iAdminUserRepository'
import { left, right } from '@shared/either'
import { AdminUserErrors } from '@business/errors/adminUser'
import { IAbstractService } from '../abstractService'

@injectable()
export class FindAllAdminUsersService
  implements
    IAbstractService<IInputFindAllAdminUsersDto, IOutputFindAllAdminUsersDto>
{
  constructor(
    @inject(IAdminUserRepositoryToken)
    private adminUserRepository: IAdminUserRepository
  ) {}

  async exec(
    props: IInputFindAllAdminUsersDto
  ): Promise<IOutputFindAllAdminUsersDto> {
    try {
      const adminUsers = await this.adminUserRepository.findAll(props)

      return right(adminUsers)
    } catch (err) {
      console.error(err)
      return left(AdminUserErrors.loadFailed())
    }
  }
}
