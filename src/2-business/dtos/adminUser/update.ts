import { IAdminUserEntity } from '@domain/entities/adminUser'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputUpdateAdminUserDto = Partial<
  Pick<IAdminUserEntity, 'name' | 'email'>
>

export type IOutputUpdateAdminUserDto = Either<
  IError,
  Partial<IAdminUserEntity>
>
