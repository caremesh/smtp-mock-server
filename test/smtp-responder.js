const { expect } = require("chai");
const casual = require('casual');
const SmtpResponder = require('../smtp-responder');
const log = require('bunyan').createLogger({name: 'smtp-responder' });

describe('passes', function () {
  let responder;

  before(function() {
    responder = new SmtpResponder(
      'localhost',
      smtpport,
      false,
    );
  });

  it('should be able to send an email', async function () {
    const msg = {
      from: casual.email,
      to: [casual.email],
      subject: casual.title,
      text: casual.sentences(7),
    };
    let result = await responder.sendMessage(msg);
    log.info(result);
  });

  it('should be able to send an MDN', async function () {
    let result = await responder.sendMdn({
      originalMessageId: casual.uuid, 
      notificationTo: casual.email,
      originalRecipient: casual.email,
      disposition: 'failed',
      subject: casual.title,
    });

    log.info(result);
  });
})
