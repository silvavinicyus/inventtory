import { inject, injectable } from 'inversify'
import { IOutputDeleteAdminUserDto } from '@business/dtos/adminUser/delete'
import { DeleteAdminUserService } from '@business/services/adminUser/delete'
import { FindByAdminUserService } from '@business/services/adminUser/findBy'
import { left } from '@shared/either'
import { AbstractUseCase } from '../abstractOperator'
import { InputDeleteAdminUser } from '../../serializers/adminUser/inputDelete'

@injectable()
export class DeleteAdminUserUseCase extends AbstractUseCase<
  InputDeleteAdminUser,
  IOutputDeleteAdminUserDto
> {
  constructor(
    @inject(DeleteAdminUserService)
    private deleteAdminUser: DeleteAdminUserService,
    @inject(FindByAdminUserService)
    private findByAdminUser: FindByAdminUserService
  ) {
    super()
  }

  async run(input: InputDeleteAdminUser): Promise<IOutputDeleteAdminUserDto> {
    this.exec(input)

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

    const deleteResult = await this.deleteAdminUser.exec({
      id: adminUser.value.id,
    })

    return deleteResult
  }
}
