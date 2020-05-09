const db = require('../_helpers/database');
const Playlist = db.Playlist;
const User = db.User;
const Song = db.Song;


module.exports = {
  getAllPlaylists,
  addPlaylist,
  deletePlaylist
}


async function addPlaylist(playlist, username) {

  var userID;
  var cursor = await User.findOne({_id: username});
  // console.log(JSON.stringify(cursor));
  // // cursor.each(function(err, us){
  // //     if(us != null){
  userID = cursor._id;
  // //     }
  // // });
  // username = cursor.username;
  console.log("wow");
  console.log(userID);
  // validate
  if (await Playlist.findOne({ createdBy: userID, createdDate: playlist.createdDate  })) {
    throw 'Parecord created by"' + username +" on "+ playlist.createdDate +'" already exists';
  }
  else if(!userID){
    throw 'Error with the user submitting the request. User information missing. Malformed request.';
  }
  //populate missing fields in the parecord object
  // ToDo: Im fucking stupid thanks. Have to get the song Ids from the database
  var songs = new Array();
  console.log(playlist.songs);
   for(var i = 0; i < playlist.length; i++){
     if(await Song.findOne({spotifyId: playlist.songs[i].spotifyId})){

     }
     else {
       console.log("walkigns");
       let newsong = playlist.songs[i];
       dbrecord = new Song(newsong);
       await dbrecord.save();
     }
     var song = await Song.findOne({spotifyId: playlist.songs[i].spotifyId});
     var songID = song._id;
     songs.push(songID);
   }
  //   songs.push(await Playlist.findOne())
  // }

  console.log(songs);
  let newrecord= playlist;
  playlist.createdBy = userID;
  playlist.createdDate =  new Date();
  playlist.songs = songs;
  console.log(newrecord);

  dbrecord = new Playlist(newrecord);


  // save the record
  await dbrecord.save();
  return "recorded!";
}


async function getAllPlaylists(username) {
  //Returning the result of the promise.
  user = await User.findOne({username: username});
  userID = user._id;
  return await Playlist.find({createdBy: userID}).select('-hash').populate("createdBy").populate("songs");
}

async function deletePlaylist(playId, userid){
  if (await Playlist.findOne({ createdBy: userid, _id: playId })) {
    await PArecord.deleteOne({ _id: playId }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    });
    return 'Deleted 1';
  }
  else if(!userid){
    throw 'Error with the user submitting the request. User information missing. Malformed request.';
  }
  else if(await Playlist.findOne({ _id: playId  })){
    throw 'Deleted 0';
  }

  // save the record

}
