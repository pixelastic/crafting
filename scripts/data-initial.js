const playlists = require('../lib/playlists.js');
const youtube = require('../lib/youtube.js');

(async () => {
  const playlistId = playlists[0];
  // const playlistData = await youtube.getPlaylistData(playlistId);
  const videos = await youtube.getPlaylistVideos(playlistId);
  console.info(videos);
})();
