const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var mixSchema = new Schema({
  name:         { type: String, required: true },
  pass:         String,
  description:  String,
  admin:        String, // Schema.Types.ObjectId
  created:      { type: Date, default: Date.now },
  mixtape:      [],
  users:        []
});

mongoose.model('MixModel', mixSchema);
