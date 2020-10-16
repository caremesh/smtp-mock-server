#!/usr/bin/env node
'use strict';

var casual = require('casual');
var pony = require('pony');

describe(`SMTP server`, function () {  
    it('shoud be able to acccept a message via pony', async function () {
        var mail = pony({
            host: 'localhost',
            port: smtpport,
            from: casual.email,
            to: casual.email
        });
        mail.setHeader('content-type', 'text/plain');
        mail.setHeader('subject', casual.catch_phrase);
        mail.end(casual.sentences(7));
    })
});

