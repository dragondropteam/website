/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const semver = require('semver');

/*const validWindowsFormats = ['exe', 'msi'];
const validMacFormats = ['app', 'dmg', 'pkg'];
const validLinuxFormats = ['AppImage', 'deb', 'rpm', 'freebsd', 'pacman', 'p5p', 'apk'];
const validFormats = [];
validFormats.concat(validWindowsFormats);
validFormats.concat(validMacFormats);
validFormats.concat(validLinuxFormats);*/

//We are only supporting x64 architecture, this will need to be extended to allow
//for .exe/.msi .dmg/.app .deb/.rpm/.pkg
const ReleaseFileSchema = new Schema({
  platform: {
    type: String,
    required: true
  },
  file: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

const ReleaseSchema = new Schema({
  version: {
    type: String,
    required: true,
    unique: true
  },
  channel: {
    type: String,
    required: true
  },
  changeNotes: {
    type: String,
    required: true
  },
  published: Date,
  platforms: {
    type: [String]
  }
});

ReleaseSchema.statics = {
  get(id) {
    return this.findById(id)
      .exec()
      .then(release => {
        if(release){
          return release;
        }

        return Promise.reject(new Error('No such release exists'))
      })
  },

  list({skip = 0, limit = 10} = {}) {
    return this.find()
      .skip(skip)
      .limit(limit)
      .sort({published: -1})
      .exec()
      .then(releases => {
        if (releases){
          return releases;
        }

        return Promise.reject(new Error('No releases'))
      })
  },

  getPlatformLatest(platform = 'windows') {
    return this.find()
      .exec()
      .then(releases => {
        if(releases){

          releases.sort((a, b) => {
            return -semver.compare(a.version, b.version);
          });

          const files = [];
          releases[0].files.forEach(file =>{
            if(file.platform == platform){
              files.push(file);
            }
          });

          return files[0];
        }
        return Promise.reject(new Error('No Releases'))
      })
  },

  getLatestRelease() {
    return this.find({channel: 'Stable'})
      .exec()
      .then(releases => {
        if(releases){

          releases.sort((a, b) => {
            return -semver.compare(a.version, b.version);
          });

          return Promise.resolve(releases[0])
        }

        return Promise.reject(new Error('No Releases'))
      })
  }
};

module.exports = mongoose.model('Release', ReleaseSchema);
