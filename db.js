const _ = require('underscore');
const bluebird = require('bluebird');
const redis = require('redis');
const flat = require('flat');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const set = (key, data, cb) => {
  console.log(data);
  let resData = _.flatten(_.pairs(flat(data)));
  console.log(resData);

  // let resData = _.flatten(_.pairs(flat(data)));
  client.hmset(key, resData, cb);
}

const get = (key, cb) => {
  client.hgetall(key, (err, res) => {
    if (err) throw (err);
    if (res) {
      cb(null, flat(res).unflatten);
    }
    else {
      cb(err, null);
    }
  });
}

module.exports = { set, get };
