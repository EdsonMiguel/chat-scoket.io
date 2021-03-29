const express = require('express');

const app = express();
const server = require('http').createServer(app);

const options={
  cors:true,
  origins:[],
 }


const io =  require('socket.io')(server, options);


var messages = [];
io.on('connection', socket =>{
  console.log('Socket conectado', socket.id)

  socket.emit('previousMessages',messages)

  socket.on('sendMessage', data =>{
    console.log(data);
    messages.push(data);
    socket.broadcast.emit('receivedMessage', data)
  })

})



server.listen(3000);