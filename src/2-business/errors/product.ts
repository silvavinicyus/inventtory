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
}
