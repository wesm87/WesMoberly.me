/**
 * Feedback section.
 */


import * as React from 'react';
import * as withStyles from 'react-css-modules';

import Link from 'components/Link';

const { PureComponent } = React;


interface Props {}
interface State {}


@withStyles(require('./style.scss'))
export default class Feedback extends PureComponent<Props, State> {

  public render() {
    return (
      <div styleName="root">
        <div styleName="container">
          <Link
            styleName="link"
            to="https://gitter.im/kriasoft/react-starter-kit"
          >
            Ask a question
          </Link>
          <span styleName="spacer">|</span>
          <Link
            styleName="link"
            to="https://github.com/kriasoft/react-starter-kit/issues/new"
          >
            Report an issue
          </Link>
        </div>
      </div>
    );
  }
}
