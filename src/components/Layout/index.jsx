import React from 'react';
import PropTypes from 'prop-types';
import Seo from '../Seo';
import '../../utils/styles/index.scss';
import Navigation from '../Navigation';
import Footer from '../Footer';

export default function Layout({ children, ...props }) {
  return (
    <>
      <Seo {...props} />
      <Navigation />
      <main>{children}</main>
      <Footer/>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  ...Seo.propTypes,
};
