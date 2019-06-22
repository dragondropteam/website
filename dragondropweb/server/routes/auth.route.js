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
    User.findOne({'identityProviders.providerId': 'email', 'identityProviders.identifier': req.body.email})
      .then(user => {

        const provider = user.identityProviders.find(element => element.identifier === req.body.email);

        argon2.verify(provider.data.password, req.body.password)
          .then(match => {
            if (match) {

              user.lastLogin = new Date();
              user.markModified('lastLogin');
              user.save()
                .then(user => console.log(user))
                .catch(err => console.log(err));

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
