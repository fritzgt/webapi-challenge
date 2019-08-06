const express = require('express');

//implementing routing
const router = express.Router();

//import database
const db = require('../data/helpers/actionModel');

//get all actions
router.get('/', (req, res) => {
  db.get()
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

//get by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.get(id)
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(err => {
      res.status(400).json({ Message: 'Invalid ID' });
    });
});

//Post Create request >>>>>>>>>>>>>>>>>>> >>>>>>>>>>>>>>>>>>>
//Required description, notes and project_id
router.post('/', (req, res) => {
  const newAction = req.body;
  const { project_id, description, notes } = newAction;
  const action = db.get(project_id);
  db.insert(newAction)
    .then(action => {
      res.status(200).json({ action });
    })
    .catch(err => {
      if (!description || !notes) {
        res.status(400).json({ message: 'Missing required field' });
      } else if (!action._promise0) {
        res.status(400).json({ message: 'invalid action id' });
      } else {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      }
    });
});

//Update request with id (implementing middleware)
//requires valid id
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db.update(id, changes)
    .then(project => {
      if (!project) {
        res.status(400).json({ message: 'invalid action id' });
      } else {
        res.status(200).json({ project });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

//Delete request with id (implementing middleware)
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(project => {
      if (!project) {
        res.status(400).json({ message: 'invalid id' });
      } else {
        res.status(200).json({ project });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

module.exports = router;
