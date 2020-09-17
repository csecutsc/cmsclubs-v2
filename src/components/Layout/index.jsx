import React from 'react';
import PropTypes from 'prop-types';
import Seo from '../Seo';
import '../../utils/styles/index.scss';
import Navigation from '../Navigation';

export default function Layout({ children, ...props }) {
    return (
        <>
            <Seo {...props}/>
            <Navigation/>
            <main>
                {children}
            </main>
        </>
    );
}

Layout.propTypes = {
    children: PropTypes.node,
    ...Seo.propTypes,
};