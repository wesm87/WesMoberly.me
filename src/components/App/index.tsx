/**
 * Render app.
 */

import * as _ from 'lodash';
import * as React from 'react';
import * as withStyles from 'react-css-modules';

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


class App extends PureComponent<Props, State> {
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
        insertCss = _.noop,
        onSetTitle = _.noop,
        onSetMeta = _.noop,
        onPageNotFound = _.noop,
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

export default withStyles(App, require('./styles.scss'));
