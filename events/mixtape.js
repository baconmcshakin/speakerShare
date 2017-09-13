/**
 * On the 'Join Mix' event, the currently connected user is
 * added to their requested mixtape.
 */
const joinMix = (socket, mix) => {
  socket.join(mix);
  console.log(`User ${ socket.id } has joined mix ${ mix }`);
  socket.emit('user joined mix', { message: `${  } has joined ${ mix }` });
}

/**
 * On the 'View Mix Users' event, the currently connected user can check
 * the users also participating in their mix.
 */
const viewMixUsers = (rt, mix, callback) => {
  console.log(`Checking client list in room ${ room }`);
  rt.of('/').in(mix).clients((error, users) => {
    if (error) throw error;
    console.log(`Clients in mix ${ mix }: ${ users }`);
    callback(users);
  });
}

module.exports = { joinMix, viewMixUsers }
