import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import Link from '../Link';
import styles from './MDRenderer.module.scss';

const renderers = {
  link: ({ href, ...props }) => <Link to={href} {...props} />,
};

export default function MDRenderer({ children }) {
  return (
    <div className={styles.container}>
      <Markdown renderers={renderers} source={children} />
    </div>
  );
}

MDRenderer.propTypes = {
  /** The MD stuff in string representation */
  children: PropTypes.string.isRequired,
};