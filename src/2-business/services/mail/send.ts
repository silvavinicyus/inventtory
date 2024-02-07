import { inject, injectable } from 'inversify'
import { IInputSendMailDto, IOutputSendMailDto } from '@business/dtos/mail/send'
import {
  IMailExternalService,
  IMailExternalServiceToken,
} from '@business/extServices/mail/iMail'
import { left, right } from '@shared/either'
import { MailServiceErrors } from '@business/errors/mail'
import { IAbstractService } from '../abstractService'

@injectable()
export class SendMailService
  implements IAbstractService<IInputSendMailDto, IOutputSendMailDto>
{
  constructor(
    @inject(IMailExternalServiceToken)
    private mailExternalService: IMailExternalService
  ) {}

  async exec(props: IInputSendMailDto): Promise<IOutputSendMailDto> {
    try {
      await this.mailExternalService.send(props)

      return right(void 0)
    } catch (err) {
      console.error(err)
      return left(MailServiceErrors.sendFailed())
    }
  }
}
