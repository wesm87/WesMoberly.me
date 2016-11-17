/**
 * Render app.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';
import { noop } from 'lodash';

import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppFooter from 'components/AppFooter';

const { PureComponent } = React;


interface Props {
  context?: ComponentContext;
  error: {
    readonly [index: string]: any;
  };
}

interface State {}


@withStyles(require('./styles.scss'))
export default class App extends PureComponent<Props, State> {
  public render() {
    const { children, error } = this.props;

    if (error) {
      return null;
    }

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

  protected getChildContext() {
    const {
      context: {
        insertCss = noop,
        onSetTitle = noop,
        onSetMeta = noop,
        onPageNotFound = noop,
      },
    } = this.props;

    return {
      insertCss,
      onSetTitle,
      onSetMeta,
      onPageNotFound,
    };
  }
}
