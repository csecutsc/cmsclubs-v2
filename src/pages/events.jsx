import React from 'react';
import Section from '../components/Section';
import Layout from '../components/Layout';
import Text from '../components/Text';
import Link from '../components/Link';

export default function Events() {
  return (
    <Layout title='Events'>
      <Section>
        <Text tag='h1' size='splash' color='heading' bold>
          Coming Soon...
        </Text>
        <Text color='text' size='larger' bold>
          Meanwhile, enjoy this{' '}
          <Link to='https://www.youtube.com/watch?v=w9ii672jcmY' bold>
            video
          </Link>
          .
        </Text>
      </Section>
    </Layout>
  );
}
