const express = require('express');

const server = express();

//Parsing to json
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Welcome to nodeJS/Express Sprint');
});

module.exports = server;
