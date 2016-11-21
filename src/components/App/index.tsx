/**
 * Render app.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppFooter from 'components/AppFooter';

const { PureComponent } = React;


interface Props {
  children?: React.ReactNode;
}

interface State {}


@withStyles(require('./styles.scss'))
export default class App extends PureComponent<Props, State> {
  public render() {
    const { children } = this.props;

    return (
      <div className="c-app">
        <AppHeader />
        <AppMain>
          {children}
        </AppMain>
        <AppFooter />
      </div>
    );
  }
}
