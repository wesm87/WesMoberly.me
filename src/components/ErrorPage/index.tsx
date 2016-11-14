/**
 * Error page.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {
  context: ComponentContext;
}

interface State {}


const title = 'Error';

class ErrorPage extends PureComponent<Props, State> {

  public render() {
    return (
      <div>
        <h1>{title}</h1>
        <p>Sorry, an critical error occurred on this page.</p>
      </div>
    );
  }

  protected componentWillMount() {
    const { context } = this.props;

    context.onSetTitle(title);
  }
}

export default withStyles(ErrorPage, require('./style.scss'));
