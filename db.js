const _ = require('underscore');
const redis = require('redis');
const flat = require('flat');

const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

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
    console.log(res);
    if (_.isObject(res)) return flat(res).unflatten;
    else return res;
  })
  .then((response) => {
    cbHandle(response, cb);
  }); // revisit scope/.bind issue
}

module.exports = { set, get };
