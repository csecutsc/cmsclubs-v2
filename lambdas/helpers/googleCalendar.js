const MarkdownIt = require('markdown-it');
const { google } = require('googleapis');
const getAuth = require('./googleAuth');
require(`dotenv`).config();

const getCalendar = async () => {
  return google.calendar({ version: `v3`, auth: await getAuth() });
};

const md = new MarkdownIt();
const serializeGraphCMSEvent = (event) => ({
  summary: event.heading,
  description:
    md.renderInline(event.description || '') +
    `\n\n${event.tags.map((i) => `<strong>${i}</strong>`).join(', ')}`,
  location: event.location,
  start: {
    dateTime: event.start,
  },
  end: {
    dateTime: event.end,
  },
  extendedProperties: {
    private: {
      graphcms_id: event.id,
    },
  },
});

module.exports = {
  async createOrUpdate(event) {
    const calendar = await getCalendar();
    const gc_event = await calendar.events
      .list({
        calendarId: process.env.GOOGLE_CALENDAR,
        privateExtendedProperty: `graphcms_id=${event.id}`,
        maxResults: 1,
      })
      .then((_) => _.data.items[0]);

    // Event doesnt exist, let's make it
    if (!gc_event) {
      return await calendar.events
        .insert({
          calendarId: process.env.GOOGLE_CALENDAR,
          requestBody: serializeGraphCMSEvent(event),
        })
        .then((_) => _.data);

      // Update event with new stuff
    } else {
      return await calendar.events
        .update({
          calendarId: process.env.GOOGLE_CALENDAR,
          eventId: gc_event.id,
          requestBody: serializeGraphCMSEvent(event),
        })
        .then((_) => _.data);
    }
  },
  async remove(event) {
    const calendar = await getCalendar();
    const gc_event = await calendar.events
      .list({
        calendarId: process.env.GOOGLE_CALENDAR,
        privateExtendedProperty: `graphcms_id=${event}`,
        maxResults: 1,
      })
      .then((_) => _.data.items[0]);

    if (gc_event) {
      await calendar.events.delete({
        calendarId: process.env.GOOGLE_CALENDAR,
        eventId: gc_event.id,
      });
      return gc_event;
    }
  },
};
