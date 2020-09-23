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
  /** uppercase, lowercase, captialize */
  transform: PropTypes.string,
  /** relax, normal, tight */
  spacing: PropTypes.string,
  /** Exactly what you think it is */
  className: classNameType,
  /** start, center, end */
  align: PropTypes.string,
  /** Colors from css variables */
  color: PropTypes.string,
  /** Refer to _variables.scss */
  size: PropTypes.string,
  /** You should know this */
  bold: PropTypes.bool,
  /** What element should this component be? */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.func,
  ]),
};
