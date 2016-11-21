
/**
 * Renders the app "main content" section.
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';
import { Match } from 'react-router';

import routes from 'routes';

const { PureComponent } = React;


interface Props {}

interface State {}


@withStyles(require('./style.scss'))
export default class AppMain extends PureComponent<Props, State> {
  public render() {
    return (
      <main styleName="root">
        {routes.map(this.renderRoute)}
      </main>
    );
  }

  protected renderRoute = (item, index) => (
    <Match key={index} {...item} />
  )
}
