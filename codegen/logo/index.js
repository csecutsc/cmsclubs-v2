const { PRIMARY_COLOR } = require('../env');
const fs = require('fs/promises');
const path = require('path');
const fss = require('fs');

module.exports = async function () {
  const [ svg ] = await Promise.all([
    fs.readFile(path.join(__dirname, `logo.svg`))
      .then((content) => content.toString().replace(/\$COLOR/g, PRIMARY_COLOR))
    ,
    new Promise(async resolve => {
      if (!fss.existsSync(`./static`)) {
        await fs.mkdir(`./static`);
      }
      resolve();
    }),
  ]);

  return Promise.all([
    fs.writeFile(`./src/images/logo.svg`, svg),
    fs.writeFile(`./static/logo.svg`, svg),
  ]);
};
