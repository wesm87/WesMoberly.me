/**
 * Renders a content page.
 */


import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {
  context: ComponentContext;
  path: string;
  content: string;
  title?: string;
}

interface State {}


class ContentPage extends PureComponent<Props, State> {

  protected static contextTypes: ComponentContext;

  public componentWillMount() {
    const { context: { onSetTitle } } = this.props;
    onSetTitle(this.props.title);
  }

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


export default withStyles(ContentPage, require('./style.scss'));
