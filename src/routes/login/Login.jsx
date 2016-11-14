
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.scss';

function Login({ title }) {
  return (
    <div styleName="root">
      <div styleName="container">
        <h1>{title}</h1>
        <p>...</p>
      </div>
    </div>
  );
}

Login.propTypes = { title: PropTypes.string.isRequired };

export default withStyles(Login, s);
