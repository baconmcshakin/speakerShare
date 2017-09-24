const _ = require('underscore');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const User = mongoose.models.UserModel;

module.exports = (rt, socket) => {

  const initializeUser = (data, callback) => {
    let initUser = new User({ "current_socket": socket.id });
    initUser.save().then((initRes) => {
      console.log(initRes);
      socket.emit('set mongo id', initRes._id);
    })
  }

  const auth = (data, callback) => {
    console.log("auth running");
    // data = Jason.parse(data);
    let userId = data.id; // do something to ID
    console.log(userId);
    User.find({ "fb_id" : userId })
      .then((response) => {
        if (!_.isEmpty(response)) {
          User.update(response._id, { "current_socket": socket.id },
            (err, updateRes) => {
              console.log(err);
              console.log(updateRes);
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
          console.log("nooooooo");
          console.log(data.token);
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
            console.log(saveRes);
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
        console.log("updateRes on logout: " + updateRes);
        return callback({
          status: true
        })
      })
  }

  return { auth, logout };
}
