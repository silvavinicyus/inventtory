import { IInputDeleteAdminUserDto } from '@business/dtos/adminUser/delete'
import {
  IFindAllResponses,
  IInputFindAllAdminUsersDto,
} from '@business/dtos/adminUser/findAll'
import { IInputFindByAdminUserDto } from '@business/dtos/adminUser/findBy'
import { ITransaction } from '@business/dtos/transaction/create'
import {
  IAdminUserEntity,
  IAdminUserEntityKeys,
} from '@domain/entities/adminUser'
import { IWhere } from '../where'

export const IAdminUserRepositoryToken = Symbol.for('IAdminUserRepositoryToken')

export type updateWhereAdminUser = IWhere<
  keyof IAdminUserEntityKeys,
  string | number
>

export interface IInputUpdateAdminUser {
  updateWhere: updateWhereAdminUser
  newData: Partial<IAdminUserEntity>
}
export interface IAdminUserRepository {
  create(input: IAdminUserEntity, trx?: ITransaction): Promise<IAdminUserEntity>
  findBy(input: IInputFindByAdminUserDto): Promise<IAdminUserEntity>
  findAll(input: IInputFindAllAdminUsersDto): Promise<IFindAllResponses>
  update(
    input: IInputUpdateAdminUser,
    trx?: ITransaction
  ): Promise<Partial<IAdminUserEntity>>
  delete(input: IInputDeleteAdminUserDto, trx?: ITransaction): Promise<void>
}
