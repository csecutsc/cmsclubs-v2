import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Seo from '../Seo';
import DarkModeProvider from '../DarkModeProvider';
import Navigation from '../Navigation';
import Footer from '../Footer';
import '../../utils/styles/index.scss';
export default function Layout({ children, ...props }) {
  useEffect(() => {
    window.setTimeout(() => {
      document.body.classList.add(`animate`);
    }, 0);
  }, []);
  return (
    <DarkModeProvider>
      <Seo {...props} />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </DarkModeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  ...Seo.propTypes,
};
