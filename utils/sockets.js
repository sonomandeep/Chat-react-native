import openSocket from 'socket.io-client';
import { API_LINK } from '../constants/apiLinks';

// Initialize Socket IO:
export const socket = openSocket(API_LINK, {
  transports: ['websocket'],
  jsonp: false,
});

// export the function to connect and use socket IO:
export const startSocketIO = store => {
  socket.connect();

  socket.on('connect', () => {
    console.log('Connesso');
  });
};
