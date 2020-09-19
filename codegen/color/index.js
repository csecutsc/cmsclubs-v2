const { PRIMARY_COLOR } = require('../env');
const fs = require('fs/promises');
const path = require('path');

module.exports = async function () {
  await fs.writeFile(
    `./src/utils/styles/_colors.scss`,
    await fs
      .readFile(path.join(__dirname, `_colors.scss`))
      .then((content) => content.toString().replace(/\$COLOR/g, PRIMARY_COLOR)),
  );
};
