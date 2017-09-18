const _ = require('underscore');
const Promise = require('bluebird');
const redis = require('redis');
const db = require('../db.js');

module.exports = (rt, socket) => {
  /**
   * doesMixExist checks our database to see if the mix object
   * exists.
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  const doesMixExist = (name) => {
    return new Promise((resolve, reject) => {
      db.get(`mix.${name}`, (response) => {
        return resolve(!_.isNull(response));
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
    let mixName = data.name.toLowerCase();
    let mixPass = data.password;

    Promise.all([
      doesMixExist(mixName),
      isMixChannelEmpty(mixName)
    ])
    .then((res) => {
      console.log(res);
      console.log(_.isEqual(res, [false, true]));
      if (_.isEqual(res, [false, true])) {
        db.set(`mix.${mixName}`, data, (success) => {
          console.log(success);
          if (success === 1) {
            console.log("Success, new mix created. " + mixName);
            socket.join(mixName);
            return true;
          }
        })
      } else {
        console.log("Failure, mix not created. " + mixName);
        return false;
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
    let newMix = data.newMix;
    let mixName = data.name.toLowerCase();
    let mixPass = data.password;

    doesMixExist(mixName)
    .then((res) => {
      console.log(res);
      if (_.isObject(res)
          && mixName === res.name
          && mixPass === res.password) {
        socket.join(mixName);
        return true;
      }
      else {
        return false;
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
