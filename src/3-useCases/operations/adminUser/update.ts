import { inject, injectable } from 'inversify'
import { IOutputUpdateAdminUserDto } from '@business/dtos/adminUser/update'
import { UpdateAdminUserService } from '@business/services/adminUser/update'
import { FindByAdminUserService } from '@business/services/adminUser/findBy'
import { left } from '@shared/either'
import { AdminUserErrors } from '@business/errors/adminUser'
import { AbstractUseCase } from '../abstractOperator'
import { InputUpdateAdminUser } from '../../serializers/adminUser/inputUpdate'

@injectable()
export class UpdateAdminUserUseCase extends AbstractUseCase<
  InputUpdateAdminUser,
  IOutputUpdateAdminUserDto
> {
  constructor(
    @inject(UpdateAdminUserService)
    private updateAdminUser: UpdateAdminUserService,
    @inject(FindByAdminUserService)
    private findByAdminUser: FindByAdminUserService
  ) {
    super()
  }

  async run(input: InputUpdateAdminUser): Promise<IOutputUpdateAdminUserDto> {
    this.exec(input)

    if (!input.name && !input.email) {
      return left(AdminUserErrors.missingUpdateFields())
    }

    const adminUser = await this.findByAdminUser.exec({
      where: [
        {
          column: 'uuid',
          value: input.uuid,
        },
      ],
    })

    if (adminUser.isLeft()) {
      return left(adminUser.value)
    }

    const updateResult = await this.updateAdminUser.exec(
      {
        ...input,
      },
      {
        column: 'id',
        value: adminUser.value.id,
      }
    )

    return updateResult
  }
}
