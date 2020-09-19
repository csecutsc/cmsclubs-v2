import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import classNameType from '../../utils/propTypes/classNameType';
import styles from './Text.module.scss';

export default function Text({
  as: Component,
  className,
  transform,
  spacing,
  align,
  color,
  size,
  bold,
  ...props
}) {
  return (
    <Component
      className={classNames(
        transform && styles[`text--transform-${transform}`],
        spacing && styles[`text--spacing-${spacing}`],
        align && styles[`text--align-${align}`],
        color && styles[`text--color-${color}`],
        size && styles[`text--size-${size}`],
        bold && styles[`text--bold`],
        styles.text,
        className,
      )}
      {...props}
    />
  );
}

Text.defaultProps = {
  spacing: `normal`,
  color: `text`,
  as: `p`,
};

Text.propTypes = {
  transform: PropTypes.string,
  spacing: PropTypes.string,
  className: classNameType,
  align: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  bold: PropTypes.bool,
  as: PropTypes.node,
};
