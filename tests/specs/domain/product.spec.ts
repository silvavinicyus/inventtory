import { ProductEntity } from '@domain/entities/product'
import { fakeProductEntity } from '@tests/mocks/entities/product'

describe('Product Entity', () => {
  describe('Create', () => {
    test('Should have success to create an entity', () => {
      const productEntity = ProductEntity.create(fakeProductEntity)

      expect(productEntity.isLeft()).toBeFalsy()
      expect(productEntity.isRight()).toBeTruthy()
    })
  })

  describe('Update', () => {
    test('Should have success to update an entity', () => {
      const updateFields = {
        ...fakeProductEntity,
        name: 'New Name Update',
        updated_at: new Date(),
      }

      const productEntity = ProductEntity.update(updateFields)

      expect(productEntity.isLeft()).toBeFalsy()
      expect(productEntity.isRight()).toBeTruthy()
      expect(productEntity.value.export().name).toEqual('New Name Update')
    })
  })
})
