import {
  IInputCreateAdminUserDto,
  IOUtputCreateAdminUserDto,
} from '@business/dtos/adminUser/create'
import { ITransaction } from '@business/dtos/transaction/create'
import { AdminUserErrors } from '@business/errors/adminUser'
import {
  IUniqueIdentifierExternalService,
  IUniqueIdentifierExternalServiceToken,
} from '@business/extServices/uniqueIdentifier/iUniqueIdentifier'
import {
  IAdminUserRepository,
  IAdminUserRepositoryToken,
} from '@business/repositories/adminUser/iAdminUserRepository'
import {
  AdminUserEntity,
  IInputAdminUserEntity,
} from '@domain/entities/adminUser'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractService } from '../abstractService'

@injectable()
export class CreateAdminUserService
  implements
    IAbstractService<IInputCreateAdminUserDto, IOUtputCreateAdminUserDto>
{
  constructor(
    @inject(IUniqueIdentifierExternalServiceToken)
    private uniqueIdentifier: IUniqueIdentifierExternalService,
    @inject(IAdminUserRepositoryToken)
    private adminUserRepository: IAdminUserRepository
  ) {}

  async exec(
    props: IInputAdminUserEntity,
    trx?: ITransaction
  ): Promise<IOUtputCreateAdminUserDto> {
    try {
      const adminUserEntity = AdminUserEntity.create(props)

      const adminUserResult = await this.adminUserRepository.create(
        {
          ...adminUserEntity.value.export(),
          uuid: this.uniqueIdentifier.create(),
        },
        trx
      )

      return right(adminUserResult)
    } catch (err) {
      console.error(err)
      return left(AdminUserErrors.creationFailed())
    }
  }
}
