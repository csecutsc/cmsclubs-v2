const fs = require(`fs/promises`);
require(`dotenv`).config();

module.exports = function () {
  return fs.writeFile(
    process.env.GOOGLE_CREDENTIALS_FILE,
    process.env.GOOGLE_CREDENTIALS,
  );
};