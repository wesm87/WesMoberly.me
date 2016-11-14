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

const title = 'Page Not Found';

class NotFoundPage extends PureComponent<Props, State> {

  public render() {
    return (
      <div>
        <h1>{title}</h1>
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

    onSetTitle(title);
    onPageNotFound();
  }
}

export default withStyles(NotFoundPage, require('./style.scss'));
