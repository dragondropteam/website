const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/release.controller');

router.route('/latest')
  .get((req, res, next) => {
    releaseController.downloadLatest(req, res, next, 'windows');
  });

router.get('/latest/:platform', (req, res, next) =>{
  releaseController.downloadLatest(req, res, next, req.params.platform);
});

router.get('/:version', (req, res) => {
  res.sendStatus(404);
});

router.get('/:version/:platform', (req, res) => {
  res.sendStatus(404);
});

router.get('/:version/:platform/:filename', (req, res) => {
  res.sendStatus(404);
});

router.get('/channel/:channel', (req, res) => {
  res.sendStatus(404);
});

router.get('/channel/:channel/:platform', (req, res) => {
  res.sendStatus(404);
});


module.exports = router;
