const port = process.env.port || 3000;

const path = require('path');
const express = require('express');
const bluebird = require('bluebird');
const app = express();
const http = require('http').Server(app);
const rt = require('socket.io')(http, {
  path: '/mix',
  serveClient: false
});

const events = require('./events')(rt);

// NOTE: If socket.io is used together with Express, the CORS headers will be affected only for socket.io requests. For Express can use cors.

rt.on('connection', events.handlers);

app.get('/test', function(req, res) {
   res.sendFile(path.join(__dirname + '/public/index.html'))
});

http.listen(port, () => {
  console.log("Listening on port " + port)
})
