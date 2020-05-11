const express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var userid = 'yyl4sbkuxkevwe172xf7ksrc5';

var scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'],
  redirectUri = 'http://localhost:3030/spotify/callback',
  clientId = 'b344eb9c6f034888b47d3ebf5fd823ee',
  state = 'some-state-of-my-choice';

var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId
});

var accessToken = 'BQCv0iyazO34cTVNY_spO6Ftyi7nTvahIfG_69Iex_ARjfL8Q_gLiKgO8hYaMjhnkBHcH9TzIZAXIjW5FfuFChXvHXec3k1QROACsf-n5TW2lf-C_ZgqrF84KgC5ipoCcuLcclVTUQ0GEhRhh56f1LX3PeIspN8_oAR7v1PHD91JvC4DXq2abeyBlSlRh48o0JtxqJcxrIKPkZ_7Rw3JuYtNRqZKbHnjS-eJgas-e9Nd';
spotifyApi.setAccessToken(accessToken);

router.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());


router.get('/authorize',
  function (req, res) {
    var html = spotifyApi.createAuthorizeURL(scopes);
    console.log(html);
    res.redirect(html);
  }
);

router.get('/callback',
  async function (req, res) {
  console.log('trying callback?');
    const { code } = req.query;
    console.log(code);
    try {
      var data = await spotifyApi.authorizationCodeGrant(code)
      const { access_token, refresh_token } = data.body;
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log(access_token);
      console.log(setRefreshToken);

      res.redirect('http://localhost:4200/profile');
    } catch (err) {
      res.redirect('/#/error/invalid token');
    }
  }
);

router.post('/createplaylist/:name',
  function (req, res) {spotifyApi.createPlaylist(userid, req.params.name,
    function(err, data) {
      if (err) {
        console.error('Something went wrong!');
        return res.status(400).json({
          message: 'Something went wrong'
        });
      }
      else {
        //console.log(data.body);
        return res.status(200).json({
          message: 'Playlist created successfully',
          uri: data.body.uri
        })
      }
    }
  );}
);

router.get('/search/:name/:artist',
  function (req, res) {
    spotifyApi.searchTracks('track:' + req.params.name + ' artist:' + req.params.artist, {limit:1, offset:0},
      function (err, data){
      if (err) {
        console.error('Something went wrong!');
        return res.status(400).json({
          message: err
        });
      }
      else {
        //console.log(req.params.name);
        //console.log(data.body.tracks.items[0].uri);
        return res.status(200).json({
          message: 'Song searched successfully, found',
          uri: data.body.tracks.items[0].uri.toString()
        })
      }
    }
    );
});



router.post('/addtoplaylist/:playlist/:track',
  function (req, res) {
    console.log("wowowow");
    console.log(req.params.playlist);
    spotifyApi.addTracksToPlaylist(req.params.playlist, [req.params.track], '',
    function (err, data){
      if (err) {
        console.error('Something went wrong!');
        return res.status(400).json({
          message: err
        });
      }
      else {
        console.log(data.body);
        return res.status(200).json({
          message: 'Song successfully added to playlist'
        });
      }
    }
    );
});

module.exports = router;
