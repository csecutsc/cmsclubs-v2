import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import styles from './Landing.module.scss';

export default function Landing() {
  const { site } = useStaticQuery(query);
    return (
      <Section>
        <div className={styles.container}>
          <h1 className={styles.heading}>
              <Text
                color='heading'
                size='splash'
                as='p'
                bold
              >
                Welcome to
              </Text>
              <Text
                color='primary'
                size='splash'
                as='p'
                bold
              >
                CMSClubs
              </Text>
          </h1>
          <Text size='larger' spacing='relax'>
            { site.siteMetadata.description }
          </Text>
        </div>
      </Section>
    );
}

const query = graphql`
{
  site {
    siteMetadata {
      description
    }
  }
}
`;