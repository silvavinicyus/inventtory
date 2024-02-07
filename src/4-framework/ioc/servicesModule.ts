import {
  IMailExternalService,
  IMailExternalServiceToken,
} from '@business/extServices/mail/iMail'
import {
  IUniqueIdentifierExternalService,
  IUniqueIdentifierExternalServiceToken,
} from '@business/extServices/uniqueIdentifier/iUniqueIdentifier'
import { MailExternalService } from '@framework/extServices/mailService'
import { UniqueIdentifierExternalService } from '@framework/extServices/uniqueIdentifierService'
import { ContainerModule, interfaces } from 'inversify'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUniqueIdentifierExternalService>(
    IUniqueIdentifierExternalServiceToken
  ).to(UniqueIdentifierExternalService)
  bind<IMailExternalService>(IMailExternalServiceToken).to(MailExternalService)
})
