const express = require('express');

const router = express.Router();
const releaseRoutes = require('./release.route');

router.get('/healthcheck', (req, res) => {
  res.send('OK');
});

router.use('/release', releaseRoutes);

router.get('/download', (req, res) =>{
  res.download('/Users/lukepowell/Documents/Uploads/Dragon Drop Setup 2.0.0-beta2.exe');
});

module.exports = router;
