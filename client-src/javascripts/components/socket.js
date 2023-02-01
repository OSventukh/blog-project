const { io } = require('socket.io-client');

export default function connectSocket(userId) {
  const socket = io();
  socket.emit('user', userId);
  return socket;
}
