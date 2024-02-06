import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Right, right } from '@shared/either'

interface IProductRelations {}

export interface IProductEntity
  extends ITimestamps,
    Partial<IProductRelations> {
  id: number
  uuid: string
  name: string
  description: string
  quantity: number
  bar_code: string
}

export type IInputProductEntity = Pick<
  IProductEntity,
  'name' | 'description' | 'quantity' | 'bar_code'
>
export type IProductEntityKeys = Pick<
  IProductEntity,
  'bar_code' | 'id' | 'uuid' | 'name'
>

export class ProductEntity extends AbstractEntity<IProductEntity> {
  static create(props: IInputProductEntity): Right<void, ProductEntity> {
    const currentDate = new Date()

    const productEntity = new ProductEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })

    return right(productEntity)
  }

  static update(props: Partial<IProductEntity>): Right<void, ProductEntity> {
    const currentDate = new Date()

    const productEntity = new ProductEntity({
      ...props,
      updated_at: currentDate,
    } as IProductEntity)

    return right(productEntity)
  }
}
