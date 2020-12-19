const playlists = require('../lib/playlists.js');
const youtinx = require('youtinx');
const onEach = require('../lib/onEach.js');

(async () => {
  const playlistId = playlists[0];

  await youtinx.run(playlistId, { onEach });
})();
