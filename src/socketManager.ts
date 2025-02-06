import { Server, Socket } from 'socket.io';

const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('restaurantRegister', ({ restaurantId }) => {
      socket.data.restaurant_id = restaurantId;
      console.log(`Register event received for restaurantId: ${restaurantId}`);

      if (restaurantId) {
        socket.join(restaurantId);
        console.log(`Restaurant with id: ${restaurantId} joined room.`);
      }
    });

    socket.on('userRegister', ({ userId }) => {
      socket.data.user_id = userId;
      console.log(`Register event received for user with id: ${userId}.`);
      if (userId) {
        socket.join(userId.toString());
        console.log(`User with id: ${userId} joined room.`);
      }
    });

    socket.on('courierRegister', ({ courierId }) => {
      socket.data.courier_id = courierId;
      console.log(`Register event received for courier with id: ${courierId}.`);
      if (courierId) {
        socket.join(courierId);
        console.log(`Courier with id: ${courierId} joined room.`);
      }
    });

    socket.on('courierMessage', ({ orderId, userId, message }) => {
      console.log(`Courier message for order: ${orderId} courier for User ${userId}: ${message}`);
      console.log(`Broadcasting to room: ${userId}`);
      io.to(userId.toString()).emit('newCourierMessage', { orderId, message });
      console.log(`Broadcasting AGAIN to room: userId: ${userId}, message: ${message}, orderId: ${orderId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

export default handleSocketConnection;
