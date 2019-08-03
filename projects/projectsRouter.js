const express = require('express');

//implementing routing
const router = express.Router();

//import database
const db = require('../data/helpers/projectModel');

//get projects
router.get('/', (req, res) => {
  db.get()
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//get projects by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//post projects  / create new
router.post('/', (req, res) => {
  const newProject = req.body;
  db.insert(newProject)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
