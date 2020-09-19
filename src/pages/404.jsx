import React from 'react';
import Layout from '../components/Layout';
import Section from '../components/Section';
import Text from '../components/Text';
import Link from '../components/Link';

export default function NotFoundPage() {
  return (
    <Layout title='404'>
      <Section>
        <Text size='splash' tag='h1' color='heading' bold>
          Page not found
        </Text>
        <Text spacing='relax' size='larger' bold>
          Maybe you'll find what you're looking for one day...
        </Text>
        <Link to='/' bold>Back to Home</Link>
      </Section>
    </Layout>
  );
}
