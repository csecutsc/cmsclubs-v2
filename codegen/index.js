const fs = require('fs/promises');
const path = require('path');
const IGNORE = [`index.js`, `env.js`];

(async () => {
  const files = await fs
    .readdir(__dirname)
    .then((_) => _.filter((f) => !IGNORE.includes(f)));

  console.log(`[Codegen]: ${files.length} plugins found`);
  try {
    await Promise.all(
      files.map(async (file) => {
        await require(path.join(__dirname, file))();
        console.log(`[Codegen]: ${file} build complete`);
      }),
    );
  } catch (err) {
    console.error(`[Codegen]: Error during build`);
    throw new Error(err);
  }
})();
