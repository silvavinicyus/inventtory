import { IError } from '@shared/IError'

export class TransactionErrors extends IError {
  static transactionCreationError(): IError {
    return new TransactionErrors({
      statusCode: 500,
      body: {
        code: 'TE-001',
        message: 'Error during creation of the transaction entity',
        shortMessage: 'transactionCreationFailed',
      },
    })
  }
}
