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
router.get('/:id', validateProjectID, (req, res) => {
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
router.post('/', validateProject, (req, res) => {
  const newProject = req.body;
  db.insert(newProject)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//update projects by id
router.put('/:id', validateProjectID, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//delete projects by id
router.delete('/:id', validateProjectID, (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//Get actions
router.get('/:id/actions', validateProjectID, (req, res) => {
  const id = req.params.id;
  db.getProjectActions(id)
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//Middleware section <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Validate user id
async function validateProjectID(req, res, next) {
  const { id } = req.params;
  const project = await db.get(id);
  try {
    if (!project) {
      res.status(400).json({ message: 'invalid user id' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ err });
  }
}

//Validate user
async function validateProject(req, res, next) {
  const { name, description } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: 'Missing project name' });
    } else if (!description) {
      res.status(400).json({ message: 'Missing project Description' });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json({ err });
  }
}

module.exports = router;
