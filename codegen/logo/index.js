const { PRIMARY_COLOR } = require('../env');
const fs = require('fs/promises');
const path = require('path');

module.exports = async function () {
  const svg = await fs
  .readFile(path.join(__dirname, `logo.svg`))
  .then((content) => content.toString().replace(/\$COLOR/g, PRIMARY_COLOR));
  await Promise.all([
    fs.writeFile(`./src/images/logo.inline.svg`, svg),
    fs.writeFile(`./src/images/logo.svg`, svg),
  ]);
};
