import { IInputFindAllProductsDto } from '@business/dtos/product/findAll'
import { IsArray, IsInt, IsOptional } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'
import { IInputPaginatedProps } from '../inputPaginated'

interface IInputFindAllProductsSerializer
  extends IInputPaginatedProps<
    IInputFindAllProductsDto['filters']['contains']
  > {}

export class InputFindAllProducts extends AbstractSerializer<IInputFindAllProductsSerializer> {
  @IsOptional()
  @IsInt()
  count: number

  @IsOptional()
  @IsInt()
  page: number

  @IsArray()
  contains: IInputFindAllProductsDto['filters']['contains']
}
