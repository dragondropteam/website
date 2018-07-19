/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/release.controller');

const Minio = require('minio');
const config = require('../config/config.dev');

const minioClient = new Minio.Client({
  endPoint: config.objectStore.endpoint,
  port: config.objectStore.port,
  secure: false,
  accessKey: config.objectStore.accessKey,
  secretKey: config.objectStore.secretKey
});

router.get('/file/:file', (req, res) => {
  minioClient.getObject(config.objectStore.releaseBucket, req.params.file, (error, stream) => {
    if(error){
      console.error(error);
      res.status(404).send(error);
      return;
    }

    stream.pipe(res);
  })
});

router.route('/latest')
  .get((req, res, next) => {
    releaseController.downloadLatest(req, res, next, 'windows');
  });

router.get('/latest/:platform', (req, res, next) => {
  releaseController.downloadLatest(req, res, next, req.params.platform);
});

router.get('/release/:id/:fileID', (req, res) => {
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
