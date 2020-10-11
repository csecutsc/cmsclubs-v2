const fs = require(`fs/promises`);
const path = require(`path`);
require(`dotenv`).config();

const { GOOGLE_CREDENTIALS_FILE } = require(`../env`);
module.exports = function () {
  return Promise.all([
    fs.readFile(path.join(__dirname, `googleAuth.js`))
      .then(_ => _.toString())
      .then(_ => _.replace(/\$GOOGLE_AUTH_FILE/g, GOOGLE_CREDENTIALS_FILE))
      .then(_ => fs.writeFile(`lambdas/helpers/googleAuth.js`, _)),
    fs.writeFile(`lambdas/${GOOGLE_CREDENTIALS_FILE}`, process.env.GOOGLE_CREDENTIALS),
  ]);
};