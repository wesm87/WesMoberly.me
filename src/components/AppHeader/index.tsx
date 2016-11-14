/**
 * App header component.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

import Link from 'components/Link';
import Navigation from 'components/Navigation';

const { PureComponent } = React;
const logo = require('./logo-small.png') as string;


interface Props {}
interface State {}


class Header extends PureComponent<Props, State> {
  public render() {
    return (
      <div styleName="root">
        <div styleName="container">
          <Navigation styleName="nav" />
          <Link styleName="brand" to="/">
            <img src={logo} width="38" height="38" alt="React" />
            <span styleName="brandText">Your Company</span>
          </Link>
          <div styleName="banner">
            <h1 styleName="bannerTitle">React</h1>
            <p styleName="bannerDesc">Complex web apps made easy</p>
          </div>
        </div>
      </div>
    );
  }
}


export default withStyles(Header, require('./style.scss'));
