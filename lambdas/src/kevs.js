exports.handler = function(_, __, callback) {
  callback(null, {
    statusCode: 301,
    headers: {
      Location: `/angr_kev.png`,
    },
    body: ``,
  });
}
