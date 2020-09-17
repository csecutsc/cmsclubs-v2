import React, { useEffect, useState } from 'react';
import MDRenderer from '../../../components/MDRenderer';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import Link from '../../../components/Link';
import styles from './Events.module.scss';

const date = new Intl.DateTimeFormat(`en`, {
  month: `short`,
  year: `numeric`,
  day: `numeric`,
}).format;

const time = new Intl.DateTimeFormat(`en`, {
  minute: `2-digit`,
  hour: `numeric`,
  hour12: true,
}).format;

export default function Events() {
  const [ events, setEvents ] = useState();
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
      ).then(_ => _.json());
      
      if (errors) {
        console.error(errors);
      }
      if (mounted) {
        setEvents(data?.events || []);
      }
    })();
    return () => {
      mounted = false;
    }
  }, []);

  return (
    <Section>
      <div>
        <Text as='h2' color='heading' size='large' bold>
          Upcoming Events
        </Text>
        <Link to="/events" size='larger' bold>View All</Link>
      </div>
      <ul className={styles.events}>
        {events ? events.map(event => {
          const start = new Date(event.start);
          const end = new Date(event.end);
          let dateText;

          if (start.toLocaleDateString() === end.toLocaleDateString()) {
            dateText = `${date(start)}, ${time(start)} - ${time(end)}`;
          } else {
            dateText = `${date(start)}, ${time(start)} - ${date(end)} ${time(end)}`;
          }

          return (
            <li key={event.id} className={styles.event}>
              <Text
                className={styles.heading}
                color='heading'
                size='larger'
                as='h3'
                bold
              >
                {event.heading}
              </Text>
              <Text
                color='primary'
                spacing='relax'
                bold
              >
                <Text color='heading' as='span' bold>Date: </Text>
                {dateText}
              </Text>
              <Text
                color='primary'
                spacing='relax'
                bold
              >
                <Text color='heading' as='span' bold>Hosted by: </Text>
                {event.clubs.map(i => i.short).join(', ')}
              </Text>
              <Text
                color='primary'
                spacing='relax'
                bold
              >
                <Text color='heading' as='span' bold>Location: </Text>
                {event.location}
              </Text>
              <hr className={styles.line}/>
              <MDRenderer>{event.description}</MDRenderer>
            </li>
          );
        }) : (
          <Text
            className={styles.loading}
            color='primary'
            size='large'
            as='li'
            bold
          >
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