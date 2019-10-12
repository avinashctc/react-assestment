import React from 'react';
import PropTypes from 'prop-types';

const inlineError = ({ text }) => <span style={{ color: "Red"}}>{text}</span>;

inlineError.propTypes = {
    text: PropTypes.string.isRequired
}

export default inlineError;