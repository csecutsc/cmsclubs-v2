import React from 'react';
import GraphImg from 'graphcms-image';
import { graphql, useStaticQuery } from 'gatsby';
import MDRenderer from '../../../components/MDRenderer';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import icons from './icon-map';
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
            <GraphImg
              className={styles.logo}
              backgroundColor={club.color.hex}
              image={club.logo}
              alt='club logo'
              maxWidth={60}
              withWebp
            />
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
              <ul className={styles.icons}>
                {club.links.map((link) => {
                  if (link.protocol === `Email`) {
                    link.url = `mailto:${link.url}`;
                  } else if (link.protocol === `Telephone`) {
                    link.url = `tel:${link.url}`;
                  }
                  return (
                    <li key={link.id}>
                      <a
                        className={styles[`icon-link`]}
                        href={link.url}
                        target='_blank'
                        rel='noreferrer noopener'
                      >
                        {React.createElement(icons[link.type], {
                          className: styles[`icon-asset`],
                        })}
                      </a>
                    </li>
                  );
                })}
              </ul>
              <MDRenderer>{club.description}</MDRenderer>
              {/*<Link to={club.customUrl} bold>
                Learn more
              </Link>*/}
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
        links(where: { type_not: OTHER }) {
          id
          url
          type
          protocol
        }
      }
    }
  }
`;
