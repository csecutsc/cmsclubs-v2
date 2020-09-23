import React from 'react';
import MDRenderer from '../../../../components/MDRenderer';
import Text from '../../../../components/Text';
import styles from './Announcement.module.scss';

const formatDate = (date) =>
  new Intl.DateTimeFormat(`en-US`, {
    month: `short`,
    year: `numeric`,
    day: `numeric`,
  }).format(new Date(date));

export default function Announcement({ annon }) {
  return (
    <li className={styles.card}>
      <Text color='heading' size='larger' as='h3' bold>
        {annon.heading}
      </Text>
      <Text className={styles.date} color='primary' bold>
        {formatDate(annon.releaseDatetime)}
      </Text>
      <MDRenderer>{annon.description}</MDRenderer>
    </li>
  );
}
