import { Server, Socket } from 'socket.io';

const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Restaurant registration
    socket.on('register', ({ restaurantId }) => {
      // socket.data.type = type;
      socket.data.restaurant_id = restaurantId;
      console.log(`Register event received for restaurantId: ${restaurantId}`);

      if (restaurantId) {
        // Join a room specific to the restaurantId
        socket.join(restaurantId);
        console.log(`Restaurant ${restaurantId} joined room.`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export default handleSocketConnection;
