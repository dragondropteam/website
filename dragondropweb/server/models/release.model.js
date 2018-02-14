const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReleaseSchema = new Schema({
  version: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  changeNotes: {
    type: String,
    required: true
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
      .exec()
      .then(releases => {
        if (releases){
          return releases;
        }

        return Promise.reject(new Error('No releases'))
      })
  }
};

module.exports = mongoose.model('Release', ReleaseSchema);
