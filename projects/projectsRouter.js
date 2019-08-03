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

module.exports = router;
