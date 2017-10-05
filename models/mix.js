const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mixSchema = new Schema({
  name: { type: String, required: true },
  pass: Number,
  description: String,
  // location:
  privacy: { type: String, enum: ['true', 'false'] },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  created: { type: Date, default: Date.now },
  mixtape: [{ type: Schema.Types.ObjectId, ref: 'Song' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

mongoose.model('Mix', mixSchema);
