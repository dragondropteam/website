/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const express = require('express');
const router = express.Router();
const releaseController = require('../controllers/release.controller');
const multer = require('multer');
const jwt = require('express-jwt');
const config = require('../config/config.dev');

const Minio = require('minio');
const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: config.objectStore.port,
  secure: false,
  accessKey: config.objectStore.accessKey,
  secretKey: config.objectStore.secretKey
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/releases')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({storage: storage});

router.route('/')
  .get((req, res, next) => {
    releaseController
      .list(res.params)
      .then(releases => {
        res.json(releases);
      })
      .catch(err => next(err))
  })
  .post(jwt({secret: config.jwtSecret}),
    (req, res, next) => {
      console.log(req.body);
      releaseController
        .create(req.body)
        .then(release => res.status(201).json(release))
        .catch(err => {
          //Duplicate KEY
          if (err.code === 11000) {
            //Conflict
            res.status(409).json({error: err.msg})
          } else {
            next(err);
          }
        })
    })
  .put(jwt({secret: config.jwtSecret}),
    (req, res, next) => {
      releaseController
        .update(req.body)
        .then(release => {
          res.status(200).json(release);
        })
        .catch(err => next(err))
    });


router.route('/latest')
  .get((req, res) => {
    releaseController
      .getLatestRelease()
      .then(release => {
        res.status(200).json(release)
      })
      .catch(err => {
        console.error(err);
        res.status(404).json({error: 'No releases'});
      });
  });

router.route('/latest/:platform')
  .get((req, res, next) => {
    releaseController
      .getLatest(req, res, next, 'windows');
  });

router.route('/:id')
  .get((req, res, next) => {
    releaseController
      .get(req.params)
      .then(release => {
        res.json(release)
      })
      .catch(err => next(err))
  });

router.route('/version/:semver/files')
  .get((req, res, next) => {
    console.log('Getting files for ' + req.params.semver);
    const objectStream = minioClient.listObjects('test-release', 'Dragon Drop-' + req.params.semver);
    const objects = [];
    objectStream.on('data', data => objects.push(data));
    objectStream.on('end', () => res.status(201).json(objects));
    objectStream.on('error', error => console.error(error));
  });

router.route('/:id/files')
  .get((req, res, next) => {
    const objectStream = minioClient.listObjects('test-release', 'Dragon Drop-');
    const objects = [];
    objectStream.on('data', data => objects.push(data));
    objectStream.on('end', () => res.status(201).json(objects));
    objectStream.on('error', error => console.error(error));
  });

router.route('/:id/files/:fileid')
  .get((req, res, next) => {
    console.log('get /:id/files/:fileid');
    releaseController.getFile(req, res, next);
  });

module.exports = router;
