const graphcms = require('../helpers/graphcms');

exports.handler = async function({ body }, _) {
    try {
        body = JSON.parse(body);
        const data = await graphcms.fetch(body.query, body.variables);
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (err) {
        console.error(`Unable to fetch from GraphCMS - ${err}`);
        return {
            statusCode: 403,
            body: JSON.stringify({
                error: err.message,
            }),
        };
    }
  }
  