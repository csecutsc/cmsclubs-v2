import PropTypes from 'prop-types';

const classNameType = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
]);

export default PropTypes.oneOfType([
    PropTypes.arrayOf(classNameType),
    classNameType,
]);