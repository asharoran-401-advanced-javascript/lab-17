// eslint-disable-next-line strict
'use strict';

const net = require('net');
// const uuid = require('uuid'); //Unique id -- I try to use it --
const PORT = process.env.PORT || 3001;
const server = net.createServer();



//-------- Socket Object ------------//
let socketPool = {};

///-------------------- Node Event Listener --------------------------///

server.on('connection' , socket => { // server event
//   const id = uuid(); /// it give me Unique id
  const id = `Socket-${Math.random()}`;
  socketPool[id] = socket;
  //---- collection of socket event ---------//
  socket.on('data' , dataHandler);
  socket.on('error' , err => console.log(`Socket Error ${err}`));
  socket.on('end' , () => {
    delete socketPool[id];
    console.log(`Thanks For reading , Best Regard ${id}`);
  });
});

function dataHandler(buffer) {
  let massage = JSON.parse(buffer.toString().trim()); // method is used to decode a buffer data to string according to the specified encoding type.
  broadCast(massage); // after parse the massage share it
}

const broadCast = (massage) => {
  let readEvent = JSON.stringify(massage);
  for(let socket in socketPool){ socketPool[socket].write(`${readEvent}`);} // to looping through he socket pool object By socket
};

//--------------------- Server listening -------------------//

server.listen(PORT , () => console.log(`server listening at ${PORT}`));


