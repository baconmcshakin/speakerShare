module.exports = (rt) => {
  const handlers = (socket) => {
    const Mixtape = require('./mixtape.js')(rt, socket);

    console.log(`User ${ socket.id } Connected`);

    socket.on('join mix', Mixtape.joinMix);
    socket.on('view mix users', Mixtape.viewMixUsers);

    socket.on('arbitrary', (data) => {
      console.log(data);
    });
  }

  return { handlers };
}
