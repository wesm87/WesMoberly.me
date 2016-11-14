/**
 * Renders Contact page.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;

interface Props {
  title: string;
}

interface State {}


class Contact extends PureComponent<Props, State> {

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


export default withStyles(Contact, require('./style.scss'));
