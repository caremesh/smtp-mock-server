> :warning: **Shamelessly borrowed and enhanced based on caremesh-smtp-mock**  The README below is theirs. -- Patrick

[caremesh-smtp-mock](https://www.npmjs.org/package/caremesh-smtp-mock)
==============


[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-url]
[![Node.js Version][node-image]][node-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][dependencies-image]][dependencies-url]
[![Coverage Status][coveralls-image]][coveralls-url]

[![NPM][npm-image]][npm-url]


Similar to [FakeSMTP](http://nilhcem.github.io/FakeSMTP/), caremesh-smtp-mock is a SMTP server and web server. It stores e-mails it receives in a [SQLite](http://www.sqlite.org) database, and serves them via its own web server, with a RESTful API.

## Install

```npm install -g caremesh-smtp-mock```


## Usage

``caremesh-smtp-mock``

Creates a server using the default SMTP port of 2525, HTTP port of 2526, and a database with the file name caremesh-smtp-mock.sqlite

## Options

``-l, --listen [port]``

TCP port to listen on for HTTP

``-s, --smtp [port]``

TCP port to listen on for SMTP

``-f, --file [file]``

SQLite database file

[npm-version-image]: https://img.shields.io/npm/v/caremesh-smtp-mock.svg
[npm-downloads-image]: https://img.shields.io/npm/dm/caremesh-smtp-mock.svg
[npm-image]: https://nodei.co/npm/caremesh-smtp-mock.png?downloads=true&downloadRank=true&stars=true
[npm-url]: https://npmjs.org/package/caremesh-smtp-mock
[travis-image]: https://img.shields.io/travis/llambda/caremesh-smtp-mock/master.svg
[travis-url]: https://travis-ci.org/llambda/caremesh-smtp-mock
[dependencies-image]: https://david-dm.org/llambda/caremesh-smtp-mock.svg?style=flat
[dependencies-url]: https://david-dm.org/llambda/caremesh-smtp-mock
[coveralls-image]: https://img.shields.io/coveralls/llambda/caremesh-smtp-mock/master.svg
[coveralls-url]: https://coveralls.io/r/llambda/caremesh-smtp-mock?branch=master
[node-image]: https://img.shields.io/node/v/caremesh-smtp-mock.svg
[node-url]: http://nodejs.org/download/
[gitter-join-chat-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-channel-url]: https://gitter.im/llambda/caremesh-smtp-mock
[express-session-url]: https://github.com/expressjs/session
[io-url]: https://iojs.org

