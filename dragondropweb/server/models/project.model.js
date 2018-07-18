/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  version: {
    type: String
  },
  created: {
    type: Date
  },
  lastEdited: {
    type: Date
  },
  /* minified XML representing the blocks for this project*/
  blockData: {
    type: String
  },
  /* Project specific metadata, this can represent things such as ports, board, etc... */
  metaData: {
    type: Schema.Types.Mixed
  }
  /* Assets associated with this project if any
  assets: {

  }*/
});

ProjectSchema.statics = {
  get(projectId){
    return this.findById(projectId)
      .exec()
      .then(project => {
        if(project){
          return project;
        }

        return Promise.reject(new Error('No such project exists'));
      })
  }
};

module.exports = mongoose.model('Project', ProjectSchema);
