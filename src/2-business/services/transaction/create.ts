import { IOutputCreateTransactionDto } from '@business/dtos/transaction/create'
import { TransactionErrors } from '@business/errors/transactionErrors'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractService } from '../abstractService'

@injectable()
export class CreateTransactionService
  implements IAbstractService<void, IOutputCreateTransactionDto>
{
  constructor(
    @inject(ITransactionRepositoryToken)
    private transactionRepository: ITransactionRepository
  ) {}

  async exec(): Promise<IOutputCreateTransactionDto> {
    try {
      const transaction = await this.transactionRepository.create()

      return right(transaction)
    } catch (error) {
      console.error(error)
      return left(TransactionErrors.transactionCreationError())
    }
  }
}
