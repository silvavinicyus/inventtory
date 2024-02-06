import {
  IAdminUserEntity,
  IInputAdminUserEntity,
} from '@domain/entities/adminUser'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputCreateAdminUserDto = IInputAdminUserEntity

export type IOUtputCreateAdminUserDto = Either<IError, IAdminUserEntity>
