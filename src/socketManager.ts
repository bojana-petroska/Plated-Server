import { Server, Socket } from 'socket.io';

const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('restaurantRegister', ({ restaurantId }) => {
      // socket.data.type = type;
      socket.data.restaurant_id = restaurantId;
      console.log(`Register event received for restaurantId: ${restaurantId}`);

      if (restaurantId) {
        socket.join(restaurantId);
        console.log(`Restaurant with id: ${restaurantId} joined room.`);
      }
    });

    socket.on('registerUser', ({ userId }) => {
      socket.data.user_id = userId;
      console.log(`Register event received for user with id: ${userId}.`);
      if (userId) {
        socket.join(userId);
        console.log(`User with id: ${userId} joined room.`);
      }
    });

    socket.on('registerCourier', ({ courierId }) => {
      socket.data.courier_id = courierId;
      console.log(`Register event received for courier with id: ${courierId}.`);
      if (courierId) {
        socket.join(courierId);
        console.log(`Courier with id: ${courierId} joined room.`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export default handleSocketConnection;
