const nodemailer = require('nodemailer');

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation on ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>For account activation follow this link</h1>
          <a href="${process.env.API_URL}/api/activate/${link}">${process.env.API_URL}/api/activate/${link}</a>
        </div>
      `,
    });
  }
}

module.exports = new MailService();
