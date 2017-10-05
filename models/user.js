const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  current_socket: { type: String, required: true },
  name: String,
  fb_id: String,
  fb_token: String,
  email: String,
  location: [String],
});

mongoose.model('User', userSchema);
