const path = require('path');

const express = require('express');
const app = express();
const http = require('http').Server(app);
const rt = require('socket.io')(http);

/*
, {
  path: '/mixtape',
  serveClient: false
}
*/

const events = require('./events');

const port = process.env.port || 3000;

// NOTE: If socket.io is used together with Express, the CORS headers will be affected only for socket.io requests. For Express can use cors.

/**
 * Listens for connection to Socket.IO server
 */
rt.on('connection', (socket) => {
  console.log(`User ${ socket.id } Connected`);

  // socket.on('set username', ());

  // Room Utilities (found in ./events/room.js)
  socket.on('join mix', (room) => { events.mixtape.joinMix(socket, room); });
  socket.on('view mix users', (room, fn) => { events.mixtape.viewMixUsers(rt, room, fn); });

  socket.on('arbitrary', (data) => {
    console.log(data);
  });

});

app.get('/test', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/index.html'))
});

http.listen(port, () => {
  console.log("Listening on port " + port)
})
