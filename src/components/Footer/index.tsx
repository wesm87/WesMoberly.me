/**
 * App footer section.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

import Link from 'components/Link';

const { PureComponent } = React;


interface Props {}
interface State {}


@withStyles(require('./style.scss'))
export default class Footer extends PureComponent<Props, State> {
  public render() {
    return (
      <div styleName="root">
        <div styleName="container">
          <span styleName="text">© Your Company</span>
          <span styleName="spacer">·</span>
          <Link styleName="link" to="/">Home</Link>
          <span styleName="spacer">·</span>
          <Link styleName="link" to="/privacy">Privacy</Link>
          <span styleName="spacer">·</span>
          <Link styleName="link" to="/not-found">Not Found</Link>
        </div>
      </div>
    );
  }
}
