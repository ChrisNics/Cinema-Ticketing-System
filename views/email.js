const pug = require('pug');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(email, url, resetToken) {
    this.resetToken = resetToken;
    this.to = email;
    this.url = url;
    this.from = `Cinema Tech <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async send(data, template, subject) {
    const url = this.url;
    const token = this.token;
    const html = pug.renderFile(`${__dirname}/${template}.pug`, {
      subject,
      data,
      url,
      token,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send(
      '',
      'passwordReset',
      'Your password reset token (valid for only 10min)'
    );
  }

  async sendHire(data) {
    await this.send(data, 'baseEmail', 'Receipt');
  }
};
