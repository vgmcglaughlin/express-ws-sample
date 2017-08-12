const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');

const app = express();

app.use(express.static('public'))

app.use(function (req, res) {
  res.send({ msg: 'hello' });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('you sent: ' + message);
  });

  ws.send('welcome!');
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

setInterval(() => {
  wss.broadcast('ping');
}, 5000);

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});