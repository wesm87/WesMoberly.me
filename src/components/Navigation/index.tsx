/**
 * Navigation links.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

import Link from 'components/Link';

const { PureComponent } = React;


interface Props {
  className?: string;
  styleName?: string;
}

interface State {}


class Navigation extends PureComponent<Props, State> {
  public render() {
    const { className } = this.props;

    return (
      <div className={className} styleName="root" role="navigation">
        <Link styleName="link" to="/about">About</Link>
        <Link styleName="link" to="/contact">Contact</Link>
        <span styleName="spacer"> | </span>
        <Link styleName="link" to="/login">Log in</Link>
        <span styleName="spacer">or</span>
        <Link styleName="link highlight" to="/register">Sign up</Link>
      </div>
    );
  }
}


export default withStyles(Navigation, require('./style.scss'));
