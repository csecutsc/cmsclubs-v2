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
            Fetching Events...
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
