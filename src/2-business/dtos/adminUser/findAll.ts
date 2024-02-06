import { IWhere } from '@business/repositories/where'
import {
  IAdminUserEntity,
  IAdminUserEntityKeys,
} from '@domain/entities/adminUser'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'
import { IPaginatedResponse, IServiceOptions } from '../serviceOptions'

export interface IInputFindAllAdminUsersDto
  extends IServiceOptions<keyof IAdminUserEntityKeys, string | number> {
  whereAnd?: IWhere<keyof IAdminUserEntityKeys, string | number>[]
  whereOr?: IWhere<keyof IAdminUserEntityKeys, string | number>[]
  paginate?: boolean
}

export interface IFindAllResponses {
  paginatedResponse: IPaginatedResponse<IAdminUserEntity>
  noPaginatedResponse: IAdminUserEntity[]
}

export type IOutputFindAllAdminUsersDto = Either<IError, IFindAllResponses>
