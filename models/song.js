const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const providers = [
  'Spotify',
  'SoundCloud',
  'Apple Music',
  'Google Play',
  'Other',
];

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: String,
  album: String,
  description: String,
  length: Number,
  source: {
    id: { type: String, required: true },
    provider: { type: String, enum: providers, required: true },
    link: { type: String, required: true },
  },
});

mongoose.model('Song', songSchema);
