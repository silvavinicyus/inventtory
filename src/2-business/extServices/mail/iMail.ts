import { IInputSendMailDto } from '@business/dtos/mail/send'

export const IMailExternalServiceToken = Symbol.for('IMailExternalServiceToken')

export interface IMailExternalService {
  send(input: IInputSendMailDto): Promise<void>
}
