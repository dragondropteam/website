/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

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
    changeNotes: params.changeNotes,
    published: Date.now()
  });
  return release.save()
}

function update(params) {
  return Release.findByIdAndUpdate(params._id, params, {new: true});
}

function list(params) {
  return Release.list(params);
}

function remove(params) {
  return load(params).then(release => release.remove());
}

function addFile(req, res, next) {
  console.log(req.file);
  load(req.params)
    .then(release => {
      release.files.unshift({
        platform: 'windows',
        file: req.file.path,
        filename: req.file.filename
      });
      return release.save();
    })
    .then(release => res.json(release.files[0]))
    .catch(err => {
      next(err);
    })
}

function getFile(id, fileID) {
  return load({id: id})
    .then(release => {
      const file = release.files.id(fileID);
      if(file){
        return file;
      }else{
        throw new Error();
      }
    })
}

function getLatestRelease() {
  return Release.getLatestRelease();
}
function getLatest(req, res, next, platform = "windows") {
  console.log('getLatest');
  Release.getPlatformLatest(platform)
    .then(release => {
      res.status(200).json(release);
    })
    .catch(err => next(err));
}

function downloadLatest(req, res, next, platform = "windows") {
  Release.getPlatformLatest(platform)
    .then(file => {
      if (file) {
        res.download(file.file);
      }else{
        res.status(404).json({'error': `No downloads available for ${platform}`});
      }
    })
    .catch(err => next(err));
}

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove,
  addFile,
  getFile,
  getLatest,
  downloadLatest,
  getLatestRelease
};
