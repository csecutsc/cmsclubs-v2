import React, { useState, useEffect } from 'react';

export default function EventList() {
  const [events, setEvents] = useState();
  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetch(
        `/.netlify/functions/graphcms`,
        {
          method: `POST`,
          body: JSON.stringify({
            variables: {
              now: new Date(),
            },
            query,
          }),
        },
      ).then((_) => _.json());

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
