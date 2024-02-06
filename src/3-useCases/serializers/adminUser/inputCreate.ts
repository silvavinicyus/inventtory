import { IInputCreateAdminUserDto } from '@business/dtos/adminUser/create'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateAdminUser extends AbstractSerializer<IInputCreateAdminUserDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string
}
