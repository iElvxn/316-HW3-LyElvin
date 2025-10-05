/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()

// FOR USE WITH PLAYLISTER NOW
router.post('/playlist', PlaylistController.createPlaylist)
router.get('/playlist/:id', PlaylistController.readPlaylistById)
router.get('/playlists', PlaylistController.readAllPlaylists)
router.get('/playlistpairs', PlaylistController.readPlaylistPairs)

module.exports = router