import React from 'react';
import Layout from '../components/Layout';
import Clubs from '../sections/Home/Clubs';
import Events from '../sections/Home/Events';
import Landing from '../sections/Home/Landing';
import Announcements from '../sections/Home/Announcements';

export default function IndexPage() {
  return (
    <Layout title='Home'>
      <Landing />
      <Announcements />
      <Events />
      <Clubs />
    </Layout>
  );
}
