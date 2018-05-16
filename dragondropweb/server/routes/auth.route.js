/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const config = require('../config/config.dev');

router.route('/login')
  .post((req, res, next) => {
    User.get(req.body.email)
      .then(user => {
        argon2.verify(user.password, req.body.password)
          .then(match => {
            if (match) {
              res.json(jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {
                  id: user._id,
                  roles: user.roles
                }
              }, config.jwtSecret));
            } else {
              res.status(401).send();
            }
          })
          .catch(err => {
            console.error(err);
            res.status(500).send();
          });
      })
      .catch(err => {
        console.error(err);
        res.status(404).send();
      });
  });

module.exports = router;
