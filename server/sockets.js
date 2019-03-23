const socketIO = require('socket.io')


module.exports.initializeSockets = (httpServer) => {
  const io = socketIO(httpServer);
  io.on('connection', (socket) => {
    socket.on('participation', (participation) => {
      console.log('participation received');
      socket.emit('participation');
    });
  });
}