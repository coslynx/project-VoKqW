const ytsr = require('ytsr');
const spotify = require('spotify-web-api-node');
const soundcloud = require('soundcloud-api');

const searchYouTube = async (query) => {
  try {
    const searchResults = await ytsr(query);
    const video = searchResults.items[0];

    if (!video) {
      return null;
    }

    return {
      title: video.title,
      url: video.url,
      artist: video.author.name,
    };
  } catch (err) {
    console.error('Error searching YouTube:', err);
    return null;
  }
};

const searchSpotify = async (query) => {
  try {
    const spotifyApi = new spotify();
    spotifyApi.setCredentials(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET);

    const searchResults = await spotifyApi.searchTracks(query);
    const track = searchResults.body.tracks.items[0];

    if (!track) {
      return null;
    }

    return {
      title: track.name,
      url: track.external_urls.spotify,
      artist: track.artists[0].name,
    };
  } catch (err) {
    console.error('Error searching Spotify:', err);
    return null;
  }
};

const searchSoundCloud = async (query) => {
  try {
    const searchResults = await soundcloud.get('/tracks', {
      q: query,
      limit: 1,
    });
    const track = searchResults.body[0];

    if (!track) {
      return null;
    }

    return {
      title: track.title,
      url: track.permalink_url,
      artist: track.user.username,
    };
  } catch (err) {
    console.error('Error searching SoundCloud:', err);
    return null;
  }
};

module.exports = {
  searchYouTube,
  searchSpotify,
  searchSoundCloud,
};