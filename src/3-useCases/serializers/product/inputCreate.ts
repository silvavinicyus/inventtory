import { IInputCreateProductDto } from '@business/dtos/product/create'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateProduct extends AbstractSerializer<IInputCreateProductDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  bar_code: string

  @IsNumber()
  @IsNotEmpty()
  quantity: number
}
