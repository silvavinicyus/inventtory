import { IProductEntity, IProductEntityKeys } from '@domain/entities/product'
import { IWhere } from '@business/repositories/where'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { IServiceOptions } from '../serviceOptions'

export interface IInputFindByProductDto
  extends IServiceOptions<keyof IProductEntityKeys, string | number> {
  where: IWhere<keyof IProductEntityKeys, string | number>
}

export type IOutputFindByProductDto = Either<IError, IProductEntity>
