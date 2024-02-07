import { IError } from '@shared/IError'

export class MailServiceErrors extends IError {
  public static sendFailed(): IError {
    return new MailServiceErrors({
      statusCode: 500,
      body: {
        code: 'MS-001',
        message: 'Error while sending this email.',
        shortMessage: 'sendFailed',
      },
    })
  }
}
