import { inject, injectable } from 'inversify'
import {
  IInputDeleteAdminUserDto,
  IOutputDeleteAdminUserDto,
} from '@business/dtos/adminUser/delete'
import { ITransaction } from '@business/dtos/transaction/create'
import {
  IAdminUserRepository,
  IAdminUserRepositoryToken,
} from '@business/repositories/adminUser/iAdminUserRepository'
import { left, right } from '@shared/either'
import { AdminUserErrors } from '@business/errors/adminUser'
import { IAbstractService } from '../abstractService'

@injectable()
export class DeleteAdminUserService
  implements
    IAbstractService<IInputDeleteAdminUserDto, IOutputDeleteAdminUserDto>
{
  constructor(
    @inject(IAdminUserRepositoryToken)
    private adminUserRepository: IAdminUserRepository
  ) {}

  async exec(
    props: IInputDeleteAdminUserDto,
    trx?: ITransaction
  ): Promise<IOutputDeleteAdminUserDto> {
    try {
      await this.adminUserRepository.delete(props, trx)

      return right(void 0)
    } catch (err) {
      console.error(err)
      return left(AdminUserErrors.deleteFailed())
    }
  }
}
