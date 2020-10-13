const { google } = require('googleapis');
require(`../.google-auth.json`);

module.exports = function() {
  return new google.auth.GoogleAuth({
    scopes: [`https://www.googleapis.com/auth/calendar`],
    keyFile: `src/.google-auth.json`,
  });
}