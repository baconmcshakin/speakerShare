const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, required: true },
  fb_id: { type: String, },
  fb_token: { type: String },
  email: { type: String },
  current_socket: String,
});

mongoose.model('UserModel', userSchema);
