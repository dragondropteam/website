const express = require('express');

const router = express.Router();

router.get('/download/latest', (req, res) => {
  res.download('/Users/lukepowell/Documents/Uploads/Dragon Drop Setup 2.0.0-beta2.exe');
});

router.get('/download/latest/:platform', (req, res) =>{
  res.sendStatus(404);
});

router.get('/download/:version', (req, res) => {
  res.sendStatus(404);
});

router.get('/download/:version/:platform', (req, res) => {
  res.sendStatus(404);
});

router.get('/download/:version/:platform/:filename', (req, res) => {
  res.sendStatus(404);
});

router.get('/download/channel/:channel', (req, res) => {
  res.sendStatus(404);
});

router.get('/download/channel/:channel/:platform', (req, res) => {
  res.sendStatus(404);
});


module.exports = router;
