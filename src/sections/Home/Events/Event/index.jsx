import React from 'react';
import MDRenderer from '../../../../components/MDRenderer';
import Text from '../../../../components/Text';
import styles from './Event.module.scss';

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

export default function Event({ event }) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  let dateText;

  if (start.toLocaleDateString() === end.toLocaleDateString()) {
    dateText = `${date(start)}, ${time(start)} - ${time(end)}`;
  } else {
    dateText = `${date(start)}, ${time(start)} - ${date(end)} ${time(end)}`;
  }

  return (
    <li className={styles.event}>
      <Text
        className={styles.heading}
        color='heading'
        size='larger'
        as='h3'
        bold
      >
        {event.heading}
      </Text>
      <Text color='primary' spacing='relax' bold>
        <Text color='heading' as='span' bold>
          Date:{' '}
        </Text>
        {dateText}
      </Text>
      <Text color='primary' spacing='relax' bold>
        <Text color='heading' as='span' bold>
          Hosted by:{' '}
        </Text>
        {event.clubs.map((i) => i.short).join(', ')}
      </Text>
      <Text color='primary' spacing='relax' bold>
        <Text color='heading' as='span' bold>
          Location:{' '}
        </Text>
        {event.location}
      </Text>
      <hr className={styles.line} />
      <MDRenderer>{event.description}</MDRenderer>
    </li>
  );
}
