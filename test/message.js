const Message = require('../message');
const casual = require('casual');
const _ = require('lodash');
const { expect } = require('chai');

describe('Message model', function() {
  it('should be possible to save a message', async function() {
    await Message.create({
      to: [casual.email],
      from: casual.email,
      subject: casual.title,
      text: casual.sentences(7),
    });
  });

  it('should be possible to retrieve a message', async function() {
    const msg = {
      to: [casual.email],
      from: casual.email,
      subject: casual.title,
      text: casual.sentences(7),
    };

    await Message.create(msg);
    let result = await Message.findOne({subject: msg.subject});
    expect(result.to).to.deep.equal(msg.to);
    expect(result.cc).to.deep.equal(msg.cc);
    expect(result.subject).to.equal(msg.subject);
    expect(result.text).to.equal(msg.text);
  })
});
