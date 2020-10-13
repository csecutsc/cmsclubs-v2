const googleCalendar = require('../helpers/googleCalendar');

exports.handler = async function({ headers, body }, _) {
  if (headers.secret !== process.env.GRAPHCMS_SECRET) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: `Invalid request... You do not know the sacred word >:c`,
      }),
    };
  }

  const { data: event, operation } = JSON.parse(body);
  try {
    switch (operation) {
      case `publish`: {
        console.log(`Updating/Creating event for ${event.id}`);
        const gcEvent = await googleCalendar.createOrUpdate(event);

        console.log(`Event successfully updated/created - ${gcEvent.id}`);
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: `Event successfully updated/created: ${event.id} -> ${gcEvent.id}`,
          }),
        };
      }
      case `unpublish`: {
        console.log(`Deleting event for ${event.id}`);
        const gcEvent = await googleCalendar.remove(event.id);

        if (!gcEvent) {
          console.error(`No Google event instance found for ${event.id}`);
          return {
            statusCode: 403,
            body: JSON.stringify({
              error: `No Google event instance found for this event`,
            }),
          };
        }

        console.log(`Event successfully removed - ${gcEvent.id}`);
        return {
          statusCode: 200,
          body: JSON.stringify({
            success: `Event successfully removed: ${event.id} -> ${gcEvent.id}`,
          }),
        };
      }
      default:
        console.error(`Unsupported operation: ${operation}`);
        return {
          statusCode: 403,
          body: JSON.stringify({
            error: `Unsupported operation: ${operation}`,
          }),
        };
    }
  } catch (err) {
    console.error(`Error from Google Calendars API`, err);
    return {
      statusCode: 403,
      body: JSON.stringify({
        error: `Error from Google Calendars API`,
      }),
    };
  }
}
