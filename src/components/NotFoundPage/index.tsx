/**
 * 404 page
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {
  context: ComponentContext;
}

interface State {}


@withStyles(require('./style.scss'))
export default class NotFoundPage extends PureComponent<Props, State> {

  private title = 'Page Not Found';

  public render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <p>Sorry, but the page you were trying to view does not exist.</p>
      </div>
    );
  }

  protected componentWillMount() {
    const {
      context: {
        onSetTitle,
        onPageNotFound,
      },
    } = this.props;

    onSetTitle(this.title);
    onPageNotFound();
  }
}
