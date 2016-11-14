
/**
 * Renders the app "main content" section.
 */

import * as React from 'react';
import * as addStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {
  children: React.ReactNode;
}

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


export default addStyles(AppMain, require('./style.scss'));
