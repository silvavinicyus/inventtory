import { IProductEntity } from '@domain/entities/product'

export const fakeProductEntity: IProductEntity = {
  id: 1,
  uuid: '6e41b9be-4607-4914-abbd-76b0b641873d',
  name: 'product name',
  bar_code: 'barcode',
  description: 'description field',
  quantity: 10,
  created_at: new Date(),
  updated_at: new Date(),
}
