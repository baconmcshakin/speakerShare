const _ = require('underscore');
const Promise = require('bluebird');
//const db = require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const MixModel = require('../db/models/mixModel.js');

module.exports = (rt, socket) => {

  var mixSchema = new Schema({
    name:         { type: String, required: true },
    password:     String,
    description:  String,
    admin:        String, // Schema.Types.ObjectId
    created:      { type: Date, default: Date.now },
    mixtape:      [],
    users:        []
  });

  const Mix = mongoose.model('MixModel', mixSchema);
  const mix = new Mix();

  /**
   * doesMixExist checks our database to see if the mix object
   * exists.
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  const doesMixExist = (name) => {
    console.log("doesMixExist: " + name);
    return new Promise((resolve, reject) => {
      console.log(mix);
      mix.find({ "name": name })
      .then((response) => {
        console.log(response);
        // return resolve(!_.isNull(response));
      });
    });
  }

  /**
   * isMixChannelEmpty checks a mix to see if there are users inside.
   * @param  {[type]}  name The name of the mix we're looking up.
   * @return {Boolean}      Are there users in this mix?
   */
  const isMixChannelEmpty = (name) => {
    return new Promise((resolve, reject) => {
      rt.of('/').in(name).clients((error, users) => {
        if (error) return reject(error);
        return resolve(_.isEmpty(users));
      });
    });
  }

  /**
   * mixResponse formats a response object so we don't send back
   * hidden info about a mix, like the password or the admin id.
   * @param  {object} mix initial Mix object
   * @return {object}     clean response Mix object
   */
  const mixResponse = (mix) => {
    return {
      "name": mix.name,
      "description": mix.description,
      "created": mix.created,
    }
  }

  /**
   * Creates a new mix with given name and password.
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  const createMix = (data, callback) => {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    console.log(data);
    console.log(typeof data);
    console.log(data.name);
    let mixName = data.name.toLowerCase();
    let mixPass = data.pass;

    Promise.all([
      doesMixExist(mixName),
      isMixChannelEmpty(mixName)
    ])
    .then((res) => {
      console.log(res);
      console.log(_.isEqual(res, [false, true]));
      if (_.isEqual(res, [false, true])) {
        mix.set({
          "name": mixName,
          "pass": mixPass,
          "description": data.description,
        })
        .save()
        .then((res) => {
          console.log(res);
          console.log("Success, new mix created. " + mixName);
          socket.join(mixName);
          return callback(true);
        });
      } else {
        console.log("Failure, mix not created. " + mixName);
        return callback(false);
      }
    });
  }

/*
Old logic for join mix to move to createMix

if (_.isEmpty(users) && newMix === true) {
  // creating a new mix
  console.log (`${ socket.id } has created the mix ${ mixName }.`);

  db.set(mixName, {
    password: mixPass,
    description: data.description || "",
    created: Date.now(),
    admin: socket.id // facebook id
  }, (err) => {
    if (!err) {
      socket.join(mixName);
      callback({ "code": 200, "data": { "name": mixName } });
    } else {
      callback({ "code": 500, "data": {} });
    }
  });
  socket.join(mixName);
  callback({ "code": 200, "data": {} });
}
else if (_.isEmpty(users)) {
  // can't join a mix that doesn't exist
  console.log (`${ socket.id } is attempting to join a mix ("${ mixName }") that doesn't exist.`);
  callback({ "code": 403 });
}
else if (!_.isEmpty(users) && mixPass === mixes[mixName].password) {
  // you successfully joined an existing mix
  console.log(`User ${ socket.id } has joined mix ${ mixName }.`);
  socket.join(mixName);
  // socket.emit('user joined mix', { message: `User has joined ${ data }` });
  callback({ "code": 200, "data": mixes[mixName] });
}
else if (!_.isEmpty(users) && mixPass != mixes[mixName].password) {
  // you entered the wrong password for this existing mix
  console.log(`Wrong password: ${ socket.id } attempting to join ${ mixName }.`);
  callback({ "code": 401 });
}
else {
  // bad request
  console.log(`Bad request: ${ socket.id } attempting to join ${ mixName }.`);
  callback({ "code": 400 });
}
 */


  /**
   * On the 'Join Mix' event, the currently connected user is
   * added to their requested mixtape.
   *
   * On Join:
   *  {
   *    name: 'MixName',
   *    password: 'password'
   *  }
   *
   * On Create:
   *  {
   *    newMix: true,
   *    name: 'MixName',
   *    password: 'password',
   *    description: 'whatever',
   *  }
   */



  /**
   * [joinMix description]
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {Boolean}           Is join successful?
   */
  const joinMix = (data, callback) => {
    let mixName = data.name.toLowerCase();
    let mixPass = data.password;

    console.log("fuckin join mix: " + data);
    console.log(data);
    console.log(typeof data);
    console.log(mixName);

    const dbGetMix = (bool) => {
      console.log("dbGetMix: " + bool);
      return new Promise((resolve, reject) => {
        if (bool === true) {
          console.log(`mix.${mixName}`);
          db.get(`mix.${mixName}`, (mixRes) => {
            console.log("here's what we got: " + mixRes);
            return resolve(mixRes);
          });
        } else {
          return resolve(null);
        }
      });
    }

    doesMixExist(mixName)
    .then(dbGetMix)
    .then((res) => {
      console.log(res);
      console.log(_.isObject(res));
      console.log(mixName === res.name);
      console.log(mixPass === res.password);
      if (_.isObject(res)
          && mixName === res.name
          && mixPass === res.password) {
        socket.join(mixName);
        return callback(true);
      }
      else {
        return callback(false);
      }
    });
  }

  /**
   * On the 'View data Users' event, the currently connected user
   * can check the users also participating in their mix.
   */

  /**
   * [viewMixUsers description]
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  const viewMixUsers = (data, callback) => {
    let mixName = data;
    console.log(`Checking client list in mixtape ${ mixName }`);
    rt.of('/').in(mixName).clients((error, users) => {
      if (error) throw error;
      console.log(`Clients in mix ${ mixName }: ${ users }`);
      return callback(users);
    }); // promisify and chain with .then(handle)
    // .then((users) => {
    //  // lookup each user.
    // })
  }

  return { createMix, joinMix, viewMixUsers };
}
