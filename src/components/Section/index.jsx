import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import classNameType from '../../utils/propTypes/classNameType';
import styles from './Section.module.scss';

export default function Section({
  contentClassName,
  as: Component,
  className,
  children,
}) {
  return (
    <Component className={classNames(styles.container, className)}>
      <div className={classNames(contentClassName, styles.content)}>
        {children}
      </div>
    </Component>
  );
}

Section.defaultProps = {
  as: `section`,
};

Section.propTypes = {
  /** The className for the element wrapping the content */
  contentClassName: classNameType,
  /** The className for the element main container */
  className: classNameType,
  /** Exactly what you think it is */
  children: PropTypes.node,
  /** What is the tag used by the container? */
  as: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
};
