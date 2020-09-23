const { PRIMARY_COLOR } = require('../env');
const fs = require('fs/promises');
const path = require('path');
const fss = require('fs');

module.exports = async function () {
  const [ svg ] = await Promise.all([
    fs.readFile(path.join(__dirname, `logo.svg`))
      .then((content) => content.toString().replace(/\$COLOR/g, PRIMARY_COLOR)),
    new Promise(resolve => {
      if (!fss.existsSync(`./static`)) {
        resolve(fs.mkdir(`./static`));
      }
    }),
  ]);

  await Promise.all([
    fs.writeFile(`./src/images/logo.svg`, svg),
    fs.writeFile(`./static/logo.svg`, svg),
  ]);
};
