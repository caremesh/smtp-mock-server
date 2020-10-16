const mimemessage = require('mimemessage');
const nodemailer = require('nodemailer');
const assert = require('assert');
const _ = require('lodash');
const moment = require('moment');
const { v4 } = require('uuid');

function stringifyReportBody(body) {
  let result = _(body)
    .toPairs()
    .map((i) => `${i[0]}:${i[1]}`)
    .join('\n');
  return result + "\n";
}

module.exports = class SmtpResponder {
  constructor(smarthost, smarthostPort, smarthostSsl) {
    this.smarthost = smarthost;
    this.smarthostPort = smarthostPort;
    this.smarthostSsl = smarthostSsl;
  }

  get transporter() { 
    return nodemailer.createTransport({ 
        host: this.smarthost,
        port: this.smarthostPort, 
        secure: this.smarthostSsl,
        ignoreTLS: true,
        tls: {
          rejectUnauthorized: false,
        },
      }); 
  }

  async sendMessage({ from, to, cc, subject, text, html, attachments }) {
    if (!cc) { cc = []; }
    if (!attachments) { attachments = []; }

    // validate inputs
    assert(Array.isArray(to, `To addresses must be an array, got "${to.toString()}`));
    assert(Array.isArray(cc, `Cc addresses must be an array, got "${cc.toString()}`));


    assert(!_.isEmpty(from), `From address must not be empty!`);
    assert(!!text | !!html, "Must provide text or html body!");

    const msg = { from, to, cc, subject, text, html, attachments };
    let result = await this.transporter.sendMail(msg);
    return result;
  }

  async sendMdn({originalMessageId, notificationTo, originalRecipient, disposition, subject}) {
    if (!notificationTo) {
      throw new Error(`No notification recipient configured`);
    }

    if (!originalMessageId) {
      throw new Error(`Cannot compose mdn without original message id!`);
    }

    const msg = {
      envelope: {
        from: '<>',
        to: originalRecipient,
      },
      raw: this.renderMdn(originalMessageId, notificationTo, originalRecipient, disposition, subject),
    };

    return await this.transporter.sendMail(msg);
  }

  renderMdn(originalMessageId, notificationTo, originalRecipient, disposition, subject) {
    const reportBody = {
      // 'Original-Recipient': `rfc822;${originalRecipient}`,
      'Final-Recipient': `rfc822;${originalRecipient}`,
      'Disposition': `automatic-action/MDN-sent-automatically;${disposition}`,
      'Original-Message-ID': `<${originalMessageId}>`,
      // 'MDN-Gateway': 'smtp;caremesh.app',
      // 'X-DIRECT-FINAL-DESTINATION-DELIVERY': '',
    };

    const result = mimemessage.factory({
      contentType: 'multipart/mixed',
      body: [],
    });

    const plainText = mimemessage.factory({
      contentType: 'text/plain',
      contentTransferEncoding: '7bit',
      body: [
        `careMESH reports that message with subject "${subject}"`,
        `has been marked as ${disposition.toUpperCase()} by recipient:`,
        ``,
        `${originalRecipient}`,
      ].join('\n'),
    });

    const report = mimemessage.factory({
      contentType: 'message/disposition-notification',
      contentTransferEncoding: '7bit',
      body: stringifyReportBody(reportBody),
    });

    result.body.push(plainText);
    result.body.push(report);

    result.header('From', `<${originalRecipient}>`);
    result.header('To', `<${notificationTo}>`);
    result.header('Message-Id', `<${v4()}@caremesh.app>`);
    result.header('Subject', `${disposition}: ${subject}`);
    result.header('Date', moment().format('ddd, DD MMM YYYY HH:mm:ss Z'));
    result.header('X-Original-Content-Type', 'multipart/report; report-type=disposition-notification');
    result.header('MIME-Version', '1.0');
    result.header('Content-Class', 'urn:content-classes:message');
    result.header('X-Reciever', `<${notificationTo}>`);
    result.header('X-Receiver', notificationTo);
    result.header('Priority', 'normal');
    result.header('Importance', 'normal');
    result.header('X-Sender', originalRecipient);

    return result.toString();
  }
}
