const readJsonUrl = require('firost/lib/readJsonUrl');
module.exports = async (url) => {
  return await readJsonUrl(url, { diskCache: './.cache' });
};
