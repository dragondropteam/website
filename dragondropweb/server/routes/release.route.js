const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/release.controller');

router.route('/')
  .get((req, res, next) => {
    releaseController
      .list(res.params)
      .then(releases => {
        res.json(releases);
      })
      .catch(err => next(err))
  })
  .post((req, res, next) =>{
    console.log(req.body);
    releaseController
      .create(req.body)
      .then(release => res.json(201, release))
      .catch(err => next(err))
  });

module.exports = router;
