const datastore = require('nedb-promise');
const _ = require('lodash');

const db = datastore({
  // these options are passed through to nedb.Datastore 
  autoload: true, // so that we don't have to call loadDatabase()
});

module.exports = class Message {
  static find(criteria) {
    return db.find(criteria);
  }

  static async findOne(criteria) {
    return _.first(await this.find(criteria));
  }

  static async create(msg) {
    let result = await db.insert(msg);
    return new Message(msg);
  }

  constructor(msg) {
    return _.assign(this, msg);
  }
}

