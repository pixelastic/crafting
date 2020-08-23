const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const buildUrl = require('../lib/buildUrl.js');
const readJsonUrl = require('../lib/readJsonUrl.js');
const _ = require('golgoth/lib/lodash');

module.exports = {
  baseUrl: 'https://www.googleapis.com/youtube/v3',
  async api(endpoint, userOptions) {
    const baseUrl = `${this.baseUrl}/${endpoint}`;
    const options = {
      key: youtubeApiKey,
      ...userOptions,
    };
    const url = buildUrl(baseUrl, options);
    return await readJsonUrl(url);
  },
  async getPlaylistData(playlistId) {
    const rawData = await this.api('playlists', {
      part: 'snippet',
      id: playlistId,
    });

    const channelId = _.get(rawData, 'items[0].snippet.channelId');
    const channelTitle = _.get(rawData, 'items[0].snippet.channelTitle');
    const playlistTitle = _.get(rawData, 'items[0].snippet.title');
    return {
      playlist: {
        id: playlistId,
        title: playlistTitle,
      },
      channel: {
        id: channelId,
        title: channelTitle,
      },
    };
  },
  async getPlaylistVideos(playlistId) {
    const rawData = await this.api('playlistItems', {
      playlistId,
      part: 'snippet,contentDetails',
      // maxResults: 50,
      // pageToken: null,
    });
    // TODO: Make sure we can have more than 50 results at once
    // TODO: Get popularity metrics
    // pageToken = pageItems.nextPageToken;

    const videos = _.map(rawData.items, (video) => {
      const id = _.get(video, 'contentDetails.videoId');
      const date = _.get(video, 'contentDetails.videoPublishedAt');
      const title = _.get(video, 'snippet.title');
      const description = _.get(video, 'snippet.description');
      const thumbnails = _.get(video, 'snippet.thumbnails');
      const position = _.get(video, 'snippet.position');
      return {
        id,
        title,
        description,
        date,
        position,
        thumbnails,
      };
    });
    return videos;
  },
};
