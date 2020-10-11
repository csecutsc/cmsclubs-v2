const fetch = require('node-fetch');
require(`dotenv`).config();

module.exports = {
  fetch(query, variables) {
    return fetch(process.env.GATSBY_GRAPHCMS_ENDPOINT, {
      method: `POST`,
      headers: {
        Authorization: `bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
      },
      body: JSON.stringify(
        Object.assign({ query }, variables && { variables }),
      ),
    })
    .then(async (_) => {
      const { data, error } = await _.json();
      if (error) throw new Error(error);
      else return data;
    });
  },
};
