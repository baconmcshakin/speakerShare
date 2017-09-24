const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const providers = [
  'Spotify',
  'SoundCloud',
  'Apple Music',
  'Google Play',
  'Other'
]

let songSchema = new Schema({
  title: { type: String, required: true },
  artist: String,
  album: String,
  description: String,
  length: Number,
  source: {
    provider: { type: String, enum: providers, required: true },
    source_link: { type: String, required: true }
  }
});

mongoose.model('Song', songSchema);
