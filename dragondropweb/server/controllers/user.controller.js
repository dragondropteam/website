const User = require('../models/user.model');
const argon2 = require('argon2');

function listUsers(res, req, next) {
  User.list(req.params)
    .then(releases => {
      res.json(releases);
    })
    .catch(error => {
      next(error);
    })
}


function createUser(req, res, next) {
  argon2.hash(req.body.password)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash,
        displayName: req.body.displayName
      });

      user.save()
        .then(user => {
          res.json(user);
          return next();
        })
        .catch(err => {
          switch (err.code) {
            case 11000://Duplicate Entry
              res.sendStatus(409);
              break;
            default:
              next(err);
          }
        });
    })
    .catch(err => {
      next(err);
    })
}

module.exports = {
  listUsers: listUsers,
  createUser: createUser
};
