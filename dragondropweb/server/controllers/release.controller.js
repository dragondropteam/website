const Release = require('../models/release.model');
const fs = require('fs-extra');

function load(params) {
  return Release.get(params.id);
}

function get(params) {
  return load(params);
}

function create(params) {
  const release = new Release({
    version: params.version,
    channel: params.channel,
    changeNotes: params.changeNotes
  });
  return release.save()
}

function update(params) {
  return load(params).then(release => {
    release.version = params.version;
    release.channel = params.channel;
    release.changeNotes = params.changeNotes;
  })
}

function list(params) {
  return Release.list(params);
}

function remove(params) {
  return load(params).then(release => release.remove());
}

function addFile(req, res, next) {
  // console.log(req.file);
  load(req.params)
    .then(release => {
      release.platforms[req.body.platform].push({
        platform: req.body.platform,
        file: req.file.path
      });
      release.save();
      res.json(release.platforms[req.body.platform]);
    })
    .catch(err => {
      console.error(err);
      next(err);
    })
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
  addFile
};
