const playlistService = require('../services/playlist.service');
const userService = require('../services/user.service');
const db = require('../_helpers/database');
const User = db.User;

module.exports = {
  createPlaylist,
  getPlaylists,
  deletePlaylist
};


function createPlaylist(req, res, next) {
  //TODO: via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.

  playlistService.addPlaylist(req.body, req.user.sub)
    .then(playlist => res.json(playlist))
    .catch(err => next(err));


}


function getPlaylists(req,res,next){
//TODO: return all parecords from the database and send to the client.
  playlistService.getAllPlaylists(req.params.username)
    .then(playlist => res.json(playlist))
    .catch(err => next(err));
}


function deletePlaylist(req,res,next){

//TODO: delete parecord from the database and respond to the client by conforming the action.
  playlistService.deletePlaylist(req.params.date, req.user.sub)
    .then(playlist=> res.json(playlist))
    .catch(errors => next(errors));

}
