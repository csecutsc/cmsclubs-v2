const graphcms = require('../helpers/graphcms');

module.exports = async function handler({ body }, _, callback) {
    try {
        const data = await graphcms.fetch(body.query, body.variables);
        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.error(`Unable to fetch from GraphCMS - ${err}`);
        return callback(null, {
            statusCode: 403,
            body: JSON.stringify({
                error: err.message,
            }),
        })
    }
  }
  