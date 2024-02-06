import { inject, injectable } from 'inversify'
import {
  IInputFindByAdminUserDto,
  IOutputFindByAdminUserDto,
} from '@business/dtos/adminUser/findBy'
import {
  IAdminUserRepository,
  IAdminUserRepositoryToken,
} from '@business/repositories/adminUser/iAdminUserRepository'
import { left, right } from '@shared/either'
import { AdminUserErrors } from '@business/errors/adminUser'
import { IAbstractService } from '../abstractService'

@injectable()
export class FindByAdminUserService
  implements
    IAbstractService<IInputFindByAdminUserDto, IOutputFindByAdminUserDto>
{
  constructor(
    @inject(IAdminUserRepositoryToken)
    private adminUserRepository: IAdminUserRepository
  ) {}

  async exec(
    props: IInputFindByAdminUserDto
  ): Promise<IOutputFindByAdminUserDto> {
    try {
      const adminUser = await this.adminUserRepository.findBy(props)

      if (!adminUser) {
        console.error('Admin not found')
        return left(AdminUserErrors.notFound())
      }

      return right(adminUser)
    } catch (err) {
      console.error(err)
      return left(AdminUserErrors.loadFailed())
    }
  }
}
