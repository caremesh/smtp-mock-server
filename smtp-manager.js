const { SMTPServer } = require('smtp-server');
const { simpleParser } = require('mailparser');
const Message = require('./message');
const _ = require('lodash');
const fs = require('fs');
const log = require('bunyan').createLogger({name: 'smtp-server'});

module.exports = class SMTPManager {
  constructor(port) {
    this.port = port;
    this.start().then(log.info).catch(log.error);
  }

  async start(options) {
    options = _.assign({
      name: `careMESH SMTP Mock`,
      onData: this.onData,
      disabledCommands: ['AUTH'],
      secure: false,
      // onConnect: (_, cb) => cb(),
      // onMailFrom: (cb) => cb(),
      // onRcptTo: (cb) => cb(),
      // key: secure ? fs.readFileSync(key) : undefined, // eslint-disable-line no-sync
      // cert: secure ? fs.readFileSync(cert) : undefined, // eslint-disable-line no-sync
    }, options);
    
    this.server = new SMTPServer(options);
  
    this.server.on('error', (err) => {
      log.error({
        where: `smtp server on error handler`,
        message: err.message,
        stack: err.stack,
        err: JSON.stringify(err),
      });
      reject(err);
    });

    this.server.listen(this.port);
  }

  async onData(stream, session, callback) {
    let parsed = await simpleParser(stream);
    log.info(`Got message ${parsed.subject}`);
    await Message.create(parsed);
    callback();
  }
}
