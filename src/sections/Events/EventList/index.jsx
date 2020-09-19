import React, { useState, useEffect } from 'react';

export default function EventList() {
  const [events, setEvents] = useState();
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, errors } = await fetch(
        process.env.GATSBY_GRAPHCMS_ENDPOINT,
        {
          method: `POST`,
          headers: {
            Authorization: `Bearer ${process.env.GATSBY_GRAPHCMS_TOKEN}`,
            'Content-Type': `application/json`,
          },
          body: JSON.stringify({
            variables: {
              now: new Date(),
            },
            query,
          }),
        },
      ).then((_) => _.json());

      if (errors) {
        console.error(errors);
      }
      if (mounted) {
        setEvents(data?.events || []);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
}

const query = `
query getEvents($now: DateTime!) {
  events(
    where: { end_gt: $now }
  ) {
    heading
    description
    location
    start
    end
    id
    clubs {
      short
    }
  }
}
`;
