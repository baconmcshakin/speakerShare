const _ = require('underscore');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const User = mongoose.models.User;

module.exports = (rt, socket) => {

  const auth = (data, callback) => {
    let userId = data.id; // do something to ID
    User.find({ _id : userId })
    .then((response) => {
      if (!_.isEmpty(response)) {
        User.update(response._id, { "current_socket": socket.id },
        (err, updateRes) => {
          return callback({
            status: true,
            user: {
              name: response.name,
              fb_id: response.fb_id
            }
          });
        });
      }
      else {
        // create a new user object
        let user = new User({
          current_socket: socket.id,
          name: data.name,
          email: data.email,
          fb_id: data.id,
          fb_token: data.token,
        });
        user.save((err, saveRes) => {
          if (err) callback({ status: false });
          if (saveRes.ok == 1) {
            return callback({
              status: true,
              user: {
                name: response.name,
                fb_id: response.fb_id
              }
            });
          }
          else {
            return callback({
              status: false
            });
          }
        });
      }
    });
  }

  const logout = (callback) => {
    User.update({ "current_socket" : socket.id }, { "current_socket": "" })
    .then((updateRes) => {
      // leaveMix()
      return callback({
        status: true
      })
    })
  }

  return { auth, logout };
}
