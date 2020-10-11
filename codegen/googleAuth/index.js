const { exec } = require(`child_process`);
const fs = require(`fs/promises`);

const { GOOGLE_CREDENTIALS_FILE } = require(`../env`);
module.exports = async function () {
  await fs.writeFile(
    `./lambdas/${ GOOGLE_CREDENTIALS_FILE }`,
    process.env.GOOGLE_CREDENTIALS,
  );
  // To slim the environment variables down for AWS
  return new Promise((resolve, reject) => {
    exec(`unset GOOGLE_CREDENTIALS`, (error, stdout, stderr) => {
      if (error || stderr) {
        return reject(error || stderr);
      }
      resolve();
    });
  });
};