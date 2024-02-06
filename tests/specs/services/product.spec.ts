import { IInputCreateProductDto } from '@business/dtos/product/create'
import { ProductErrors } from '@business/errors/product'
import { IUniqueIdentifierExternalServiceToken } from '@business/extServices/uniqueIdentifier/iUniqueIdentifier'
import { IProductRepositoryToken } from '@business/repositories/product/iProductRepository'
import { CreateProductService } from '@business/services/product/createProductService'
import { container } from '@shared/ioc/container'
import { fakeProductEntity } from '@tests/mocks/entities/product'
import { FakeUniqueIdentifierService } from '@tests/mocks/extServices/uniqueIdentifier'
import {
  FakeProductRepository,
  fakeProductRepositoryCreate,
} from '@tests/mocks/repositories/iProductRepository'

describe('Product Use Case Tests', () => {
  beforeAll(() => {
    container
      .bind(IUniqueIdentifierExternalServiceToken)
      .to(FakeUniqueIdentifierService)
      .inSingletonScope()
    container
      .bind(IProductRepositoryToken)
      .to(FakeProductRepository)
      .inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create Product', () => {
    test('Should have success to create a product', async () => {
      const input: IInputCreateProductDto = {
        name: 'new name',
        bar_code: 'new bar code',
        description: 'new description',
        quantity: 10,
      }

      fakeProductRepositoryCreate.mockImplementationOnce(async () => ({
        ...fakeProductEntity,
        ...input,
      }))

      const sut = container.get(CreateProductService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })

    test('Should fail to create a product if repository fail', async () => {
      const input: IInputCreateProductDto = {
        name: 'new name',
        bar_code: 'new bar code',
        description: 'new description',
        quantity: 10,
      }

      fakeProductRepositoryCreate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(CreateProductService)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(ProductErrors.creationFailed())
    })
  })
})
