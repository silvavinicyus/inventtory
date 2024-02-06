import { IProductEntity, IProductEntityKeys } from '@domain/entities/product'
import { IWhere } from '@business/repositories/where'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { IPaginatedResponse, IServiceOptions } from '../serviceOptions'

export interface IInputFindAllProductsDto
  extends IServiceOptions<keyof IProductEntityKeys, string | number> {
  whereAnd?: IWhere<keyof IProductEntityKeys, string | number>[]
  whereOr?: IWhere<keyof IProductEntityKeys, string | number>[]
}

export type IOutputFindAllProductsDto = Either<
  IError,
  IPaginatedResponse<IProductEntity>
>
