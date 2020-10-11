import React, { useEffect, useState } from 'react';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import Link from '../../../components/Link';
import Event from './Event';
import styles from './Events.module.scss';

export default function Events() {
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

  return (
    <Section>
      <div>
        <Text as='h2' color='heading' size='large' bold>
          Upcoming Events
        </Text>
        <Link to='/events' size='larger' bold>
          View All
        </Link>
      </div>
      <ul className={styles.events}>
        {events ? (
          events.length ? (
            events.map((event) => <Event key={event.id} event={event} />)
          ) : (
            <Text size='larger' as='li'>
              No upcoming events currently :c
            </Text>
          )
        ) : (
          <Text className={styles.loading} size='larger' as='li'>
            Fetching Events...
          </Text>
        )}
      </ul>
    </Section>
  );
}

const query = `
query getEvents($now: DateTime!) {
  events(
    where: { end_gt: $now }
    orderBy: start_ASC
    first: 6
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
