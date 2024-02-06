import { IProductEntity, IInputProductEntity } from '@domain/entities/product'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputCreateProductDto = IInputProductEntity

export type IOutputCreateProductDto = Either<IError, IProductEntity>
