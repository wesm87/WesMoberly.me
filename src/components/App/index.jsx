
import React, { PureComponent, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppFooter from 'components/AppFooter';

import s from './style.scss';

class App extends PureComponent {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
    };
  }

  componentWillMount() {
    const { insertCss } = this.props.context;
    this.removeCss = insertCss(s);
  }

  componentWillUnmount() {
    this.removeCss();
  }

  renderApp = () => {
    const { children, error } = this.props;

    if (error) {
      return children;
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

  render() {
    return this.renderApp();
  }

}

export default App;
