/**
 * Login page.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {
  title: string;
}

interface State {}


@withStyles(require('./style.scss'))
export default class Login extends PureComponent<Props, State> {

    public render() {
      const { title } = this.props;

      return (
        <div styleName="root">
          <div styleName="container">
            <h1>{title}</h1>
            <p>...</p>
          </div>
        </div>
      );
    }
}
