const _ = require('underscore');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const User = mongoose.models.User;

module.exports = (rt, socket) => {
  const initializeUser = (data, callback) => {
    const initUser = new User({ current_socket: socket.id });
    initUser.save().then((initRes) => {
      console.log('initializing user');
      console.log(initRes);
      socket.emit('set mongo id', initRes._id);
    });
  };

  const auth = (data, callback) => {
    const userId = data.mongo_id; // do something to ID
    if (data.id && data.token) {
      User.update(userId, {
        name: data.name,
        email: data.email,
        fb_id: data.id,
        fb_token: data.token,
      })
        .then(updateRes => callback({
          status: true,
          user: {
            name: updateRes.name,
            fb_id: updateRes.fb_id,
          },
        }))
        .catch((err) => {
          console.log(`error with auth of ${userId}`);
          return callback({ error: err });
        });
    } else {
      return callback({ error: true });
      console.log('no auth information given');
    }
  };

  const logout = (callback) => {
    User.update({ current_socket: socket.id }, { current_socket: '' })
      .then(updateRes => callback({
        status: true,
      }));
  };

  return { auth, logout, initializeUser };
};
