const fetch = require('node-fetch');

module.exports = {
  getEvents() {
    return fetch(process.env.GRAPHCMS_ENDPOINT, {
      method: `POST`,
      headers: {
        Authorization: `bearer ${process.env.GRAPHCMS_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          {
            events {
              heading
              description
              location
              start
              tags
              end
              id
            }
          }
        `,
      }),
    }).then(async (_) => {
      const { data, error } = await _.json();
      if (error) throw new Error(error);
      else return data.events;
    });
  },
};
