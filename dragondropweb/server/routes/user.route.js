const express = require('express');
const router = express.Router();
const UserControler = require('../controllers/user.controller');
router.route('/')
  .get((req, res, next) => {
    UserControler.listUsers(res, req, next);
  });

module.exports = router;
