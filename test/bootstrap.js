global.chai = require('chai')
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);
global.expect = global.chai.expect;
const SMTPServer = require('../smtp-manager');

const tmp = require('tmp');

before(async function bootstrap() {
  global.smtpport = Math.floor(Math.random() * 10000) + 10000;
  // global.tmpObj = tmp.fileSync({ prefix: 'mocktest-', postfix: '.sqlite' });

  global.smtpServer = new SMTPServer(smtpport);
  smtpServer.start();
});
