import { inject, injectable } from 'inversify'
import { FindByProductService } from '@business/services/product/findBy'
import { UpdateProductService } from '@business/services/product/update'
import { left } from '@shared/either'
import { InventotyOperation } from '@shared/utils/constants'
import { ProductErrors } from '@business/errors/product'
import { StockChecker } from '@framework/utils/stockChecker'
import { SendMailService } from '@business/services/mail/send'
import { FindAllAdminUsersService } from '@business/services/adminUser/findAll'
import { CreateTransactionService } from '@business/services/transaction/create'
import { AbstractUseCase } from '../abstractOperator'
import {
  IOutputUpdateQuantity,
  InputUpdateQuantity,
} from '../../serializers/product/inputUpdateQuantity'

@injectable()
export class UpdateQuantityUseCase extends AbstractUseCase<
  InputUpdateQuantity,
  IOutputUpdateQuantity
> {
  constructor(
    @inject(FindByProductService)
    private findByProduct: FindByProductService,
    @inject(UpdateProductService)
    private updateProduct: UpdateProductService,
    @inject(SendMailService)
    private sendMail: SendMailService,
    @inject(FindAllAdminUsersService)
    private findAllAdminUsers: FindAllAdminUsersService,
    @inject(CreateTransactionService)
    private createTransaction: CreateTransactionService
  ) {
    super()
  }

  async run(input: InputUpdateQuantity): Promise<IOutputUpdateQuantity> {
    this.exec(input)

    const product = await this.findByProduct.exec({
      where: {
        column: 'uuid',
        value: input.uuid,
      },
    })

    if (product.isLeft()) {
      return left(product.value)
    }

    if (input.operation === InventotyOperation.REMOVE) {
      const isPossibleToRemove = StockChecker.isQuantityEnough(
        product.value.quantity,
        input.quantity
      )

      if (!isPossibleToRemove) {
        return left(ProductErrors.insufficientQuantity())
      }
    }

    const newQuantity =
      input.operation === InventotyOperation.ADD
        ? product.value.quantity + input.quantity
        : product.value.quantity - input.quantity

    const transaction = await this.createTransaction.exec()
    if (transaction.isLeft()) {
      return left(transaction.value)
    }

    const updatedProduct = await this.updateProduct.exec(
      {
        quantity: newQuantity,
      },
      {
        column: 'id',
        value: product.value.id,
      },
      transaction.value.trx
    )

    if (updatedProduct.isLeft()) {
      await transaction.value.rollback()
      return left(updatedProduct.value)
    }

    const isStockLow = StockChecker.isStockLow(newQuantity)

    if (isStockLow) {
      const adminUsers = await this.findAllAdminUsers.exec({
        filters: {
          contains: [],
          containsLike: [],
        },
        paginate: false,
      })

      if (adminUsers.isLeft()) {
        await transaction.value.rollback()
        return left(adminUsers.value)
      }

      const mailResult = await this.sendMail.exec({
        subject: `Low Stock on ${product.value.name}`,
        templatePath: 'lowQuantity',
        to: [
          ...adminUsers.value.noPaginatedResponse.map((admin) => admin.email),
        ].join(','),
        payload: {
          quantity: newQuantity.toString(),
          name: product.value.name,
        },
      })

      if (mailResult.isLeft()) {
        await transaction.value.rollback()
        return left(mailResult.value)
      }
    }

    await transaction.value.commit()
    return updatedProduct
  }
}
