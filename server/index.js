import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

server.listen(3002, () => {
  console.log('Server running on port 3002');
});

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User joined room: ${data}`);
  });


  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("receive_message", data.content);
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
