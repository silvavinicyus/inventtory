import { IProductEntity } from '@domain/entities/product'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'
import { InventotyOperation } from '@shared/utils/constants'
import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export interface IInputUpdateQuantity {
  operation: InventotyOperation
  quantity: number
  uuid: string
}

export type IOutputUpdateQuantity = Either<IError, Partial<IProductEntity>>

export class InputUpdateQuantity extends AbstractSerializer<IInputUpdateQuantity> {
  @IsEnum(InventotyOperation)
  @IsNotEmpty()
  operation: InventotyOperation

  @IsNumber()
  @IsNotEmpty()
  quantity: number

  @IsUUID('4')
  @IsNotEmpty()
  uuid: string
}
