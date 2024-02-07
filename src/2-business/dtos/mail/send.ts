import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export interface IInputSendMailDto {
  to: string
  subject: string
  templatePath: string
  payload?: { [key: string]: string }
}

export type IOutputSendMailDto = Either<IError, void>
