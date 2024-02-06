import { IInputUpdateAdminUserDto } from '@business/dtos/adminUser/update'
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export interface IInputUpdateAdminUserProps extends IInputUpdateAdminUserDto {
  uuid: string
}

export class InputUpdateAdminUser extends AbstractSerializer<IInputUpdateAdminUserProps> {
  @IsNotEmpty()
  @IsUUID('4')
  uuid: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsEmail()
  email: string
}
