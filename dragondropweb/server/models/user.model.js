/*
 * Copyright (c) 2018. DigiPen Institute of Technology
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdentityProviderSchema = new Schema({
  providerId: {
    type: String,
    required: true
  },
  identifier: {
    type: String,
    required: true
  },
  data: {
    type: Schema.Types.Mixed
  }
});

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date
  },
  roles: {
    type: [String]
  }
});

//Will want to change this to follow best practices before we move to using this base for the web based version
//of DragonDrop. For the time being having registration be under lock and key is fine. Additional capabilities will need
//to be developed
UserSchema.statics = {
  get(email) {
    return this.findOne({email: email})
      .exec()
      .then(user => {
        console.log('user', user);
        if (user) {
          return user;
        }

        return Promise.reject(new Error('No such user exists'));
      })
  },
  list({skip = 0, limit = 10} = {}) {
    return this.find()
      .select(['email', 'displayName', 'lastLogin'])
      .skip(skip)
      .limit(limit)
      .exec()
      .then(users => {
        return users || [];
      })
  }
};

module.exports = mongoose.model('User', UserSchema);
