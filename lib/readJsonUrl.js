const readJsonUrl = require('firost/readJsonUrl');
module.exports = async (url) => {
  return await readJsonUrl(url, { diskCache: './.cache' });
};
