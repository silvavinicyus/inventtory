import { IInputDeleteAdminUserDto } from '@business/dtos/adminUser/delete'
import {
  IInputFindAllAdminUsersDto,
  IFindAllResponses,
} from '@business/dtos/adminUser/findAll'
import { IInputFindByAdminUserDto } from '@business/dtos/adminUser/findBy'
import {
  IAdminUserRepository,
  IInputUpdateAdminUser,
} from '@business/repositories/adminUser/iAdminUserRepository'
import { IAdminUserEntity } from '@domain/entities/adminUser'
import { injectable } from 'inversify'
import { AdminUserModel } from '@framework/models/adminUser'
import {
  createFindAllProps,
  createFindByProps,
} from '@framework/utils/repositoryPropsBuilder'
import { ITransaction } from './TransactionRepository'

@injectable()
export class AdminUserRepository implements IAdminUserRepository {
  async create(
    input: IAdminUserEntity,
    trx?: ITransaction
  ): Promise<IAdminUserEntity> {
    const adminUser = await AdminUserModel.create(input, { transaction: trx })

    return adminUser.get({ plain: true })
  }

  async findBy(input: IInputFindByAdminUserDto): Promise<IAdminUserEntity> {
    const findByProps = createFindByProps(input)

    const adminUser = await AdminUserModel.findOne(findByProps)

    if (!adminUser) {
      return void 0
    }

    return adminUser.get({ plain: true })
  }

  async findAll(input: IInputFindAllAdminUsersDto): Promise<IFindAllResponses> {
    const props = createFindAllProps(input)

    if (!input.paginate) {
      delete props.limit
      delete props.offset
    }

    const adminUsers = await AdminUserModel.findAll(props)

    if (input.paginate) {
      return {
        noPaginatedResponse: [],
        paginatedResponse: {
          count: adminUsers.length,
          items: adminUsers.map((item) => item.get({ plain: true })),
          page: input.pagination.page || 0,
          perPage: input.pagination.count || 10,
        },
      }
    }

    return {
      noPaginatedResponse: adminUsers.map((item) => item.get({ plain: true })),
      paginatedResponse: undefined,
    }
  }

  async update(
    input: IInputUpdateAdminUser,
    trx?: ITransaction
  ): Promise<Partial<IAdminUserEntity>> {
    await AdminUserModel.update(input.newData, {
      where: {
        [input.updateWhere.column]: input.updateWhere.value,
      },
      transaction: trx,
    })

    return input.newData
  }

  async delete(
    input: IInputDeleteAdminUserDto,
    trx?: ITransaction
  ): Promise<void> {
    await AdminUserModel.destroy({
      where: {
        id: input.id,
      },
      transaction: trx,
    })

    return void 0
  }
}
