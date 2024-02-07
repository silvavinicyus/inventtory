/* eslint-disable import/no-extraneous-dependencies */
import { IInputSendMailDto } from '@business/dtos/mail/send'
import { IMailExternalService } from '@business/extServices/mail/iMail'
import edge from 'edge.js'
import { injectable } from 'inversify'
import nodemailer from 'nodemailer'
import path from 'path'

@injectable()
export class MailExternalService implements IMailExternalService {
  private transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: +process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  async send(input: IInputSendMailDto): Promise<void> {
    edge.mount(path.join(__dirname, '..', 'utils', 'views'))

    const html = await edge.render(input.templatePath, input.payload)

    await this.transport.sendMail({
      from: process.env.SMTP_FROM,
      to: input.to,
      subject: input.subject,
      html,
    })
  }
}
