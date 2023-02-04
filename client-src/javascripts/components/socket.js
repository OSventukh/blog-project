const { io } = require('socket.io-client');

export default function connectSocket(loggedUser) {

  const socket = io();
  socket.emit('user', loggedUser);
  return socket;
}
