const _ = require('underscore');
const mongoose = require("mongoose");

const models = require('./models');

mongoose.connect('mongodb://localhost:27017/speakershare', { useMongoClient: true, promiseLibrary: require('bluebird') });

module.exports = models;
