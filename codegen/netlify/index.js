const fs = require(`fs/promises`);
const path = require(`path`);
require(`dotenv`).config();

module.exports = function () {
  return fs.readFile(path.join(__dirname, `netlify.toml`))
    .then(_ => _.toString())
    .then(_ => _.replace(/\$.*\$/g, str => (
      `'${process.env[str.slice(1,-1)]}'`
    )))
    .then(_ => fs.writeFile(`netlify.toml`, _));
};