const express = require('express');
const router = express.Router();
const UserControler = require('../controllers/user.controller');
const jwt = require('express-jwt');
const config = require('../config/config.dev');

router.route('/')
  .get((req, res, next) => {
    UserControler.listUsers(res, req, next);
  })
  .post((req, res, next) => {
    UserControler.createUser(req, res, next);
  });

module.exports = router;
