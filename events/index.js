const dataCheck = (data) => {
  if (typeof data === "string") {
    data = JSON.parse(data);
  }
}

module.exports = (rt) => {
  const handlers = (socket) => {
    const User = require('./user.js')(rt, socket);
    const Mixtape = require('./mixtape.js')(rt, socket);
    const Play = require('./play.js')(rt, socket);
    // const Social = require('./social.js')(rt, socket);

    console.log(`Client ID ${ socket.id } Connected`);

    // User.initializeUser(socket.id);

    // socket.on middleware (body-parser)
    // socket.on middleware (auth before adding songs, editing, ...)

    socket.on('authenticate', User.auth);
    socket.on('logout', User.logout);

    socket.on('create mix', Mixtape.createMix);
    socket.on('join mix', Mixtape.joinMix);
    // socket.on('view mix users', Mixtape.viewMixUsers);
    socket.on('leave mix', Mixtape.leaveMix);

    socket.on('add song', Play.addSong);
    socket.on('remove song', Play.removeSong);
    socket.on('edit song order', Play.editOrder);

    // socket.on('view popular tapes', Social.popularTapes);

  }

  return { handlers };
}
