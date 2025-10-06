const Playlist = require('../models/playlist-model')
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/
createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + body);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + JSON.stringify(body));
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    playlist
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                playlist: playlist,
                message: 'Playlist Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Playlist Not Created!',
            })
        })
}
readPlaylistById = async (req, res) => {
    await Playlist.findOne({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, playlist: list })
    }).catch(err => console.log(err))
}
readAllPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}

readPlaylistPairs = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: 'Playlists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in playlists) {
                let list = playlists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}

updatePlaylist = async (req, res) => {
    const body = req.body;
    console.log("updatePlaylist body: " + JSON.stringify(body));

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    await Playlist.findOneAndUpdate({ _id: req.params.id }, body, { new: true }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlist) {
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({
            success: true,
            playlist: playlist,
            message: 'Playlist Updated!',
        })
    }
    ).catch(err => console.log(err))
}

deletePlaylist = async (req, res) => {
    await Playlist.findOneAndDelete({ _id: req.params.id }, (err, playlist) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlist) {
            return res.status(404).json({
                success: false,
                error: 'Playlist not found'
            })
        }
        return res.status(200).json({
            success: true,
            playlist: playlist,
            message: 'Playlist Deleted!',
        })
    }).catch(err => console.log(err))
}

queryPlaylistsByPrefix = async (req, res) => {
    const prefix = req.query.prefix;

    if (!prefix) {
        return res.status(400).json({
            success: false,
            error: 'Prefix query parameter is required',
        })
    }

    await Playlist.find({ name: { $regex: `^${prefix}`, $options: 'i' } }, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }
    ).catch(err => console.log(err))
}

querySongs = async (req, res) => {
    const { title, artist, year } = req.query;

    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }

        let res = [];
        let seen = new Set();

        playlists.forEach(playlist => {
            playlist.songs.forEach(song => {
                let metCriteria = false;

                if ((title && song.title.toLowerCase().includes(title.toLowerCase())) ||
                    (artist && song.artist.toLowerCase().includes(artist.toLowerCase())) ||
                    (year && song.year == parseInt(year))) {
                    metCriteria = true;
                }

                if (metCriteria === true) {
                    let key = `${song.title}${song.artist}${song.year}`;
                    if (!seen.has(key)) { //if we alr have this song, then its a dupe and we dont add it to the result
                        seen.add(key);
                        res.push(song);
                    }
                }
            });
        });

        return res.status(200).json({
            success: true,
            data: allSongs,
            count: allSongs.length
        })
    }).catch(err => console.log(err))
}

module.exports = {
    createPlaylist,
    readAllPlaylists,
    queryPlaylistsByPrefix,
    querySongs,
    readPlaylistPairs,
    readPlaylistById,
    updatePlaylist,
    deletePlaylist,
}