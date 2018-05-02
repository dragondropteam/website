/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const express = require('express');
const router = express.Router();
const releaseRoutes = require('./release.route');
const authRoutes =require('./auth.route');
const downloadRoutes = require('./download.route');

router.get('/healthcheck', (req, res) => {
  res.send('OK');
});

router.use('/release', releaseRoutes);
router.use('/auth', authRoutes);

module.exports = router;
