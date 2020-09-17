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
        <Component
            className={classNames(
                styles.container,
                className,
            )}
        >
            <div
                className={classNames(
                    contentClassName,
                    styles.content,
                )}
            >
                { children }
            </div>
        </Component>
    );
}

Section.defaultProps = {
    as: `section`,
};

Section.propTypes = {
    contentClassName: classNameType,
    className: classNameType,
    children: PropTypes.node,
    as: PropTypes.node,
};
