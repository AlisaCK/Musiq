const express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
const router = express.Router();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi();
var userid = 'arman.parastaran';

var accessToken = 'BQCTGZs0EynKBkofKcIhxvwy7P2AwDXX4dBtGU18MBGdJCemuvZt__FC2mbmBZjDGu5RgwR_8pblmS-iEMwK-DInJiZiCLSLdCO8voMRgXTXRmNJ-lfO5srlq4G9WhV4hOElCaQT_eCJSlj4lavQpNARTEnS_hm1QzH0ZVtdgmTLkbvavNluJJPpdJqiNBvxo2WGjrdqzufqHd4KA9FGKDYyjS5Eqvca';
//Set access token in node
spotifyApi.setAccessToken(accessToken);

router.use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

router.post('/createplaylist',
  function () {spotifyApi.createPlaylist(
    userid,
    'Test Playlist 1',
    function(err, data) {
      if (err) {
        console.error('Something went wrong!');
      } else {
        console.log(data.body);
        return data.body.uri;
      }
    }
  );}
);

module.exports = router;
