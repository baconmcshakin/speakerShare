module.exports = (rt, socket) => {

  /**
   * Grab the song object from our database.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  const checkSongFromDb = (data) => {
  }

  /**
   * If a song doesn't exist in our Song collection in MongoDB,
   * create it.
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  const initializeSong = (data) => {
  }

  /**
   * Add a song to a specific mixtape.
   * @param {[type]}   data     [description]
   * @param {Function} callback [description]
   */
  const addSong = (data, callback) => {
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
