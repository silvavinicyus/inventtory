import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Right, right } from '@shared/either'

export interface IAdminUserEntity extends ITimestamps {
  id: number
  uuid: string
  name: string
  email: string
}

export type IInputAdminUserEntity = Pick<IAdminUserEntity, 'name' | 'email'>

export type IAdminUserEntityKeys = Pick<
  IAdminUserEntity,
  'id' | 'uuid' | 'email' | 'name'
>

export class AdminUserEntity extends AbstractEntity<IAdminUserEntity> {
  static create(props: IInputAdminUserEntity): Right<void, AdminUserEntity> {
    const currentDate = new Date()

    const adminUserEntity = new AdminUserEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })

    return right(adminUserEntity)
  }

  static update(
    props: Partial<IAdminUserEntity>
  ): Right<void, AdminUserEntity> {
    const currentDate = new Date()

    const adminUserEntity = new AdminUserEntity({
      ...props,
      updated_at: currentDate,
    } as IAdminUserEntity)

    return right(adminUserEntity)
  }
}
