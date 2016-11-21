/**
 * Renders a content page.
 */


import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {
  path: string;
  content: string;
  title?: string;
}

interface State {}


@withStyles(require('./style.scss'))
export default class ContentPage extends PureComponent<Props, State> {
  public render() {
    return (
      <div styleName="root">
        <div styleName="container">
          {this.props.path === '/' ? null : <h1>{this.props.title}</h1>}
          <div dangerouslySetInnerHTML={{ __html: this.props.content || '' }} />
        </div>
      </div>
    );
  }
}
