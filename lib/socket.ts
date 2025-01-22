import { io } from 'socket.io-client';

// Initialize socket with authentication
export const socket = io(process.env.NEXT_PUBLIC_AMBULANCE_API_URL || 'http://localhost:3001', {
  autoConnect: false,
});

export const connectSocket = (doctorId: string) => {
  socket.auth = { doctorId };
  socket.connect();

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};