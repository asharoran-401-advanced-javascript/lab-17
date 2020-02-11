// eslint-disable-next-line strict
'use strict';

const net = require('net'); //used to create both servers and clients
const client = new net.Socket();

client.connect(3001 , ' localhost' , () =>console.log(`logger is on`));

client.on('data' , (data) => {
  let event = JSON.parse(data);
  console.log(event.payload);
});

client.on('close' , () =>{ // to close the channel
  console.log(`The Connection is Off !!`);
});
