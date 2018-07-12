const User = require('../models/user.model');

function listUsers(res, req, next) {
  User.list(req.params)
    .then(releases => {
      res.json(releases);
    })
    .catch(error => {
      next(error);
    })
}

module.exports = {
  listUsers: listUsers
};
