const Release = require('../models/release.model');

function load(params) {
  return Release.get(params.id);
}

function get(req, res) {
  return res.json(req.release);
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

module.exports = {
  load,
  get,
  create,
  update,
  list,
  remove
};
