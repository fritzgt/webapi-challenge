const express = require('express');

//importing project CRUD operations
const projectsRouter = require('./projects/projectsRouter');

//importing actions CRUD operations
const actionsRouter = require('./actions/actionsRouter');

const server = express();

//Parsing to json
server.use(express.json());

//setting route for projects
server.use('/projects', projectsRouter);

//setting route for projects
server.use('/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send('Welcome to nodeJS/Express Sprint');
});

module.exports = server;
