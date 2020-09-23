import React from 'react';
import PropTypes from 'prop-types';
import { Link as L } from 'gatsby';
import Text from '../Text';
import styles from './Link.module.scss';

export default function Link({ to, external, ...props }) {
  if (external === undefined) {
    external = !to.startsWith(`/`);
  }

  const linkProps = external
    ? {
        rel: `noreferrer noopener`,
        target: `_blank`,
        href: to,
        as: `a`,
      }
    : {
        as: L,
        to,
      };

  return (
    <Text className={styles.link} color='primary' {...linkProps} {...props} />
  );
}

Link.propTypes = {
  /** Where does this link take me? */
  to: PropTypes.string.isRequired,
  /** Force as external link, which adds target=_blank and noreferrer + noopener */
  external: PropTypes.bool,
  ...Text.propTypes,
};
