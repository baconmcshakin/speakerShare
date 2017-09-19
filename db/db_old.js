const _ = require('underscore');
const redis = require('redis');
const flat = require('flat');
const Promise = require('bluebird');

const client = redis.createClient();

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const cbHandle = (res, cb) => {
  if (typeof cb === "function") {
    console.log("cb was found to be a function, returning the value of cb(res)");
    return cb(res);
  } else {
    console.log("cb was not found to be a function, returning res");
    return res;
  }
}

const set = (key, data, cb) => {
  let resData = _.flatten(_.pairs(flat(data)));
  client.hsetAsync(key, resData)
  .then((response) => {
    cbHandle(response, cb);
  }); // revisit scope/.bind issue
}

const get = (key, cb) => {
  client.hgetallAsync(key)
  .then((res) => {
    console.log("inside of db, res: " + res);
    console.log(res);
    console.log(typeof res);
    let unflatRes = flat(res).unflatten;
    console.log(unflatRes)
    if (_.isObject(res)) return unflatRes;
    else return res;
  })
  .then((response) => {
    cbHandle(response, cb);
  }); // revisit scope/.bind issue
}

module.exports = { set, get };
