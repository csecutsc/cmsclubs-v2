const { google } = require('googleapis');
require(`../$GOOGLE_AUTH_FILE`);

module.exports = function() {
  return new google.auth.GoogleAuth({
    scopes: [`https://www.googleapis.com/auth/calendar`],
    keyFile: `src/$GOOGLE_AUTH_FILE`,
  });
}