import React, { useEffect, useState } from 'react';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import Announcement from './Announcement';
import styles from './Announcements.module.scss';

export default function Announcements() {
  const [annons, setAnnons] = useState();
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
        setAnnons(data?.announcements || []);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Section>
      <Text as='h2' size='large' color='heading' bold>
        Announcements
      </Text>
      <ul className={styles.items}>
        {annons ? (
          annons.length ? (
            annons.map((annon) => <Announcement key={annon.id} annon={annon} />)
          ) : (
            <Text size='larger' as='li'>
              No announcements currently :c
            </Text>
          )
        ) : (
          <Text className={styles.loading} size='larger' as='li'>
            Fetching Announcements...
          </Text>
        )}
      </ul>
    </Section>
  );
}

const query = `
query getAnnouncements($now: DateTime!) {
  announcements(
    where: {
      releaseDatetime_lte: $now
      endDatetime_gte: $now
      global: true
    }
    orderBy: releaseDatetime_ASC
  ) {
    id
    heading
    description
    releaseDatetime
  }
}
`;
