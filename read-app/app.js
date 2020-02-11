// eslint-disable-next-line strict
'use strict';

const net = require('net');
const fs = require('fs');
const util = require('util');
const client = new net.Socket();


client.connect(3001 , ' localhost' , () => {
  console.log(`Create App for Read`);
});


let read = util.promisify(fs.readFile);
let write = util.promisify(fs.watchFile);

let file = `${__dirname}/data.text`;


const readFile = (file) => read(file);
const writeFile = (file, buffer) => write(file, buffer);

const editFile = (file) => {
  return readFile(file)
    .then(results => {
      let text = Buffer.from(results.toString().trim().toUpperCase());
      return writeFile(file, text)
        .then(() => {
          let payload = {
            event: 'saved',
            payload: 'file is write',
          };
          client.write(JSON.stringify(payload));
        })
        .catch((error) => {
          let payload = {
            name: 'error',
            data: error.message,
          };
          client.write(JSON.stringify(payload));
        });
    })
    .catch((error) => {
      let payload = {
        name: 'error',
        data: error.message,
      };
      client.write(JSON.stringify(payload));
    });
};

editFile(file);

module.exports = {editFile, readFile, writeFile};
