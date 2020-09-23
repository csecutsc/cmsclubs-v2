import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../Section';
import Text from '../Text';
import Link from '../Link';
import styles from './Footer.module.scss';

export default function Footer() {
  const { site } = useStaticQuery(query);
  return (
    <Section contentClassName={styles.container} as='footer'>
      <div className={styles.text}>
        <Text bold>Made with ❤ by CSEC Development</Text>
        <Link to={site.siteMetadata.repo} size='smaller' bold>
          Source code
        </Link>
      </div>
      <Text
        onClick={() =>
          window.scrollTo({
            behavior: `smooth`,
            top: 0,
          })
        }
        className={styles.button}
        as='button'
        bold
      >
        Back To Top
      </Text>
    </Section>
  );
}

const query = graphql`
  {
    site {
      siteMetadata {
        repo
      }
    }
  }
`;
