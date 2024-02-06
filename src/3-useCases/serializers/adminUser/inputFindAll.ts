import { IInputFindAllAdminUsersDto } from '@business/dtos/adminUser/findAll'
import { IsArray, IsInt, IsOptional } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'
import { IInputPaginatedProps } from '../inputPaginated'

interface IInputFindAllAdminUsersSerializer
  extends IInputPaginatedProps<
    IInputFindAllAdminUsersDto['filters']['contains']
  > {}

export class InputFindAllAdminUsers extends AbstractSerializer<IInputFindAllAdminUsersSerializer> {
  @IsOptional()
  @IsInt()
  count: number

  @IsOptional()
  @IsInt()
  page: number

  @IsArray()
  contains: IInputFindAllAdminUsersDto['filters']['contains']
}
