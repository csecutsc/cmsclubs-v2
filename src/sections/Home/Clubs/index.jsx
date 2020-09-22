import React from 'react';
import GraphImg from 'graphcms-image';
import { graphql, useStaticQuery } from 'gatsby';
import MDRenderer from '../../../components/MDRenderer';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import Link from '../../../components/Link';
import styles from './Clubs.module.scss';

export default function Clubs() {
  const { gcms } = useStaticQuery(query);
  return (
    <Section>
      <Text as='h2' color='heading' size='large' bold>
        Our Clubs
      </Text>
      <ul className={styles.clubs}>
        {gcms.clubs.map((club) => (
          <li
            style={{ '--color': club.color.hex }}
            className={styles.club}
            key={club.id}
          >
            <GraphImg image={club.logo} alt='club logo' maxWidth={60}/>
            <div>
              <Text
                className={styles.heading}
                as='h3'
                size='larger'
                color='heading'
                bold
              >
                {club.name} ({club.short})
              </Text>
              <MDRenderer>{club.description}</MDRenderer>
              <Link to={club.customUrl} bold>
                Learn more
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

const query = graphql`
  {
    gcms {
      clubs {
        name
        short
        id
        logo {
          handle
          height
          width
        }
        color {
          hex
        }
        customUrl
        description
      }
    }
  }
`;
