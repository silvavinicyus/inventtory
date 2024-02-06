import { IProductEntity } from '@domain/entities/product'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputUpdateProductDto = Partial<
  Pick<IProductEntity, 'name' | 'bar_code' | 'description' | 'quantity'>
>

export type IOutputUpdateProductDto = Either<IError, Partial<IProductEntity>>
