const _ = require('underscore');
const mongoose = require("mongoose");

// const models = require('./models');

// require('./models/mixModel.js');

mongoose.connect('mongodb://localhost:27017/speakershare',
  { useMongoClient: true,
    promiseLibrary: require('bluebird')
  });

const connection = mongoose.connection;

// module.exports = { connection, models };
