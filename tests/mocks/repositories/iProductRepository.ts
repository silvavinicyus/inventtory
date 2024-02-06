import { IProductRepository } from '@business/repositories/product/iProductRepository'
import { IProductEntity } from '@domain/entities/product'
import { injectable } from 'inversify'

@injectable()
export class FakeProductRepository implements IProductRepository {
  async create(_input: IProductEntity): Promise<IProductEntity> {
    return void 0
  }
}

export const fakeProductRepositoryCreate = jest.spyOn(
  FakeProductRepository.prototype,
  'create'
)
