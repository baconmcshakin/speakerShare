const _ = require('underscore');
const bluebird = require('bluebird');
const redis = require('redis');
const db = require('../db.js');

module.exports = (rt, socket) => {

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
  const joinMix = (data, callback) => {
    let newMix = data.newMix;
    let mixName = data.name.toLowerCase();
    let mixPass = data.password;

    const mixFromDb = db.get(mixName, (name) => {
      console.log("found");
      console.log(name);
      return name;
    });

    console.log(mixFromDb);

    // Handle if mix has no users
    rt.of('/').in(mixName).clients((error, users) => {
      if (error) { throw (error); }; // replace for error handler
      console.log(_.isEmpty(users));
      console.log(newMix === true);

      if (_.isEmpty(users) && newMix === true) {
        // creating a new mix
        console.log (`${ socket.id } has created the mix ${ mixName }.`);

        db.set(mixName, {
          password: mixPass,
          description: data.description || "",
          created: Date.now(),
          admin: socket.id
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

    });
  }

  /**
   * On the 'View data Users' event, the currently connected user can check
   * the users also participating in their mix.
   */
  const viewMixUsers = (data, callback) => {
    let mixName = data;
    console.log(`Checking client list in mixtape ${ mixName }`);
    rt.of('/').in(mixName).clients((error, users) => {
      if (error) throw error;
      console.log(`Clients in mix ${ mixName }: ${ users }`);
      callback(users);
    });
  }

  return { joinMix, viewMixUsers };
}
