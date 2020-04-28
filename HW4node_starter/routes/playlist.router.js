const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlist.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addplaylist', playlistController.createPlaylist);
router.get('/getplaylists/:username', playlistController.getPlaylists);
router.delete('/:id', playlistController.deletePlaylist);


module.exports = router;
