var socket = new WebSocket('ws://' + location.host);

socket.onopen = function (event) {
  console.log('onopen', event);
  socket.send('connected');
};

socket.onmessage = function (event) {
  console.log('onmessage', event.data);
  logMessageReceived(event.data);
}

socket.onclose = function (event) {
  console.log('onclose', event);
}

socket.onerror = function (event) {
  console.log('onerror', event);
}

function sendMessage() {
  var message = document.getElementById('message-input').value;
  console.log('sending', message);
  socket.send(message);
}

function logMessageReceived(message) {
  var messageElement = document.createElement('li');
  messageElement.innerText = JSON.stringify(message);
  document.getElementById('messages').appendChild(messageElement);
}
