import { IWhere } from '@business/repositories/where'
import {
  IAdminUserEntity,
  IAdminUserEntityKeys,
} from '@domain/entities/adminUser'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'
import { IServiceOptions } from '../serviceOptions'

export interface IInputFindByAdminUserDto
  extends IServiceOptions<keyof IAdminUserEntityKeys, string | number> {
  where: IWhere<keyof IAdminUserEntityKeys, string | number>[]
}

export type IOutputFindByAdminUserDto = Either<IError, IAdminUserEntity>
