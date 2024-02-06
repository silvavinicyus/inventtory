import { ProductErrors } from '@business/errors/product'
import { IUniqueIdentifierExternalServiceToken } from '@business/extServices/uniqueIdentifier/iUniqueIdentifier'
import { IProductRepositoryToken } from '@business/repositories/product/iProductRepository'
import { CreateProductService } from '@business/services/product/createProductService'
import { CreateProductUseCase } from '@root/src/3-useCases/operations/product/create'
import { InputCreateProduct } from '@root/src/3-useCases/serializers/product/inputCreate'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeProductEntity } from '@tests/mocks/entities/product'
import { FakeUniqueIdentifierService } from '@tests/mocks/extServices/uniqueIdentifier'
import { FakeProductRepository } from '@tests/mocks/repositories/iProductRepository'

describe('Create Product Use Case', () => {
  beforeAll(() => {
    container
      .bind(IUniqueIdentifierExternalServiceToken)
      .to(FakeUniqueIdentifierService)
      .inSingletonScope()
    container
      .bind(IProductRepositoryToken)
      .to(FakeProductRepository)
      .inSingletonScope()
    container.bind(CreateProductService).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should fail to create a product if service failed', async () => {
    const input = new InputCreateProduct({
      name: 'new name',
      bar_code: 'new bar code',
      description: 'new description',
      quantity: 10,
    })

    const service = container.get(CreateProductService)
    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(
        Promise.resolve(right({ ...fakeProductEntity, ...input }))
      )

    const sut = container.get(CreateProductUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })

  test('Should create a product', async () => {
    const input = new InputCreateProduct({
      name: 'new name',
      bar_code: 'new bar code',
      description: 'new description',
      quantity: 10,
    })

    const service = container.get(CreateProductService)
    jest
      .spyOn(service, 'exec')
      .mockReturnValueOnce(
        Promise.resolve(left(ProductErrors.creationFailed()))
      )

    const sut = container.get(CreateProductUseCase)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(ProductErrors.creationFailed())
  })
})
