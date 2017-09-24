const _ = require('underscore');
const Promise = require('bluebird');
const mongoose = require('mongoose');

const Mix = mongoose.models.Mix;
const Song = mongoose.models.Song;

module.exports = (rt, socket) => {

  /**
   * If a song doesn't exist in our Song collection in MongoDB,
   * create it.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  const initializeSong = (data) => {
    new Song(data)
    .save()
    .then((saveRes) => {
      console.log(saveRes)
      return saveRes
    })
    .catch((err) => {
      console.log("initializeSong Error: " err)
      return err
    })
  }

  /**
   * Grab the song object from our database. Check to make sure it exists first,
   * if not, run initializeSong
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  const grabSongFromDb = (data) => {
    return new Promise((resolve, reject) => {
      Song.findOne({"source.provider": data.provider, "source.songId": data.songId})
      .then((fetchedSong) => {
        console.log(fetchedSong);
        return resolve(fetchedSong)
      })
      .catch((err) => {
        console.log(err)
        return reject(err)
      })
    })
  }

  /**
   * Add a song to a specific mixtape.
   * @param {[type]}   data     [description]
   * @param {Function} callback [description]
   */
  const addSong = (data, callback) => {
    //let songTitle = data.title

  }

  /**
   * Remove a song from a specific mixtape.
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  const removeSong = (data, callback) => {

  }

  /**
   * Edit the order in which list of songs will play,
   * inside of a specific mix.
   * @param  {[type]}   data     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  const editOrder = (data, callback) => {

  }

  return {addSong, removeSong, editOrder}
}
