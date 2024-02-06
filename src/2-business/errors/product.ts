import { IError } from '@shared/IError'

export class ProductErrors extends IError {
  public static creationFailed(): IError {
    return new ProductErrors({
      statusCode: 500,
      body: {
        code: 'PRO-001',
        message: 'Product creation error',
        shortMessage: 'productCreationFailed',
      },
    })
  }

  public static notFound(): IError {
    return new ProductErrors({
      statusCode: 404,
      body: {
        code: 'PRO-002',
        message: 'Product Not Found',
        shortMessage: 'productNotFound',
      },
    })
  }

  public static loadFailed(): IError {
    return new ProductErrors({
      statusCode: 500,
      body: {
        code: 'PRO-003',
        message: 'Failed to load product resource',
        shortMessage: 'loadFailed',
      },
    })
  }
}
