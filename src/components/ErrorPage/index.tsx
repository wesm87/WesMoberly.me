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


@withStyles(require('./style.scss'))
export default class ErrorPage extends PureComponent<Props, State> {

  private title = 'Error';

  public render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <p>Sorry, an critical error occurred on this page.</p>
      </div>
    );
  }

  protected componentWillMount() {
    const { context } = this.props;

    context.onSetTitle(this.title);
  }
}
