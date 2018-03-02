/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/release.controller');

router.get('/healthcheck', (req, res) => {
  res.send('OK');
});

router.route('/latest')
  .get((req, res, next) => {
    releaseController.downloadLatest(req, res, next, 'windows');
  });

router.get('/latest/:platform', (req, res, next) => {
  releaseController.downloadLatest(req, res, next, req.params.platform);
});

router.get('/release/:id/:fileID', (req, res) => {
  console.log('/release/:id/:fileID');
  const id = req.params.id;
  const fileID = req.params.fileID;
  releaseController.getFile(id, fileID)
    .then(file => {
      res.download(file.file);
    })
    .catch(() => {
      res.status(404).json({'error': 'File not found'});
    });
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
