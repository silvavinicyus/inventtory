import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputDeleteAdminUserDto = {
  id: number
}

export type IOutputDeleteAdminUserDto = Either<IError, void>
