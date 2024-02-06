import {
  IInputUpdateAdminUserDto,
  IOutputUpdateAdminUserDto,
} from '@business/dtos/adminUser/update'
import {
  IAdminUserRepository,
  IAdminUserRepositoryToken,
  updateWhereAdminUser,
} from '@business/repositories/adminUser/iAdminUserRepository'
import { AdminUserEntity } from '@domain/entities/adminUser'
import { inject, injectable } from 'inversify'

import { ITransaction } from '@business/dtos/transaction/create'
import { AdminUserErrors } from '@business/errors/adminUser'
import { left, right } from '@shared/either'
import { IAbstractService } from '../abstractService'

@injectable()
export class UpdateAdminUserService
  implements
    IAbstractService<IInputUpdateAdminUserDto, IOutputUpdateAdminUserDto>
{
  constructor(
    @inject(IAdminUserRepositoryToken)
    private adminUserRepository: IAdminUserRepository
  ) {}

  async exec(
    props: IInputUpdateAdminUserDto,
    updateWhere: updateWhereAdminUser,
    trx?: ITransaction
  ): Promise<IOutputUpdateAdminUserDto> {
    try {
      const adminUserEntity = AdminUserEntity.update(props)

      const adminUserResult = await this.adminUserRepository.update(
        {
          newData: adminUserEntity.value.export(),
          updateWhere,
        },
        trx
      )

      return right(adminUserResult)
    } catch (err) {
      console.error(err)
      return left(AdminUserErrors.updateFailed())
    }
  }
}
