
/**
 * Renders the app "main content" section.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {}

interface State {}


class AppMain extends PureComponent<Props, State> {
  public render() {
    const { children } = this.props;

    return (
      <main styleName="root">
        {children}
      </main>
    );
  }
}


export default withStyles(AppMain, require('./style.scss'));
