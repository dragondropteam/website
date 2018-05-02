/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

router.route('/login')
  .post((req, res, next) => {
    User.get(req.body.email)
      .then(user => {
        console.log(user);
        console.log(argon2.verify(user.password, req.body.password));

        argon2.verify(user.password, req.body.password)
          .then(match => {
            if (match) {
              res.json(jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {
                  id: user._id,
                  roles: user.roles
                }
              }, 'secret key'));
            } else {
              res.status(401).send();
            }
          })
          .catch(err => {
            res.status(500).send();
          });
      });
  });

module.exports = router;
