import { inject, injectable } from 'inversify'
import { IOUtputCreateAdminUserDto } from '@business/dtos/adminUser/create'
import { CreateAdminUserService } from '@business/services/adminUser/create'
import { AbstractUseCase } from '../abstractOperator'
import { InputCreateAdminUser } from '../../serializers/adminUser/inputCreate'

@injectable()
export class CreateAdminUserUseCase extends AbstractUseCase<
  InputCreateAdminUser,
  IOUtputCreateAdminUserDto
> {
  constructor(
    @inject(CreateAdminUserService)
    private createAdminUser: CreateAdminUserService
  ) {
    super()
  }

  async run(input: InputCreateAdminUser): Promise<IOUtputCreateAdminUserDto> {
    this.exec(input)

    const adminUser = await this.createAdminUser.exec({
      ...input,
    })

    return adminUser
  }
}
