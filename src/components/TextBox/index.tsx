/**
 * Text box component
 */

import * as React from 'react';
import * as withStyles from 'react-css-modules';

const { PureComponent } = React;


interface Props {
  maxLines: number;
}

interface State {}


@withStyles(require('./style.scss'))
export default class TextBox extends PureComponent<Props, State> {

  protected static defaultProps = {
    maxLines: 1,
  };

  public render() {
    return (
      <div styleName="root">
        {this.renderTextBox()}
      </div>
    );
  }

  protected renderTextBox = () => {
    const { maxLines } = this.props;

    if (maxLines > 1) {
      return (
        <textarea
          {...this.props}
          styleName="input"
          // ref="input"
          key="input"
          rows={this.props.maxLines}
        />
      );
    }

    return (
      <input
        {...this.props}
        styleName="input"
        // ref="input"
        key="input"
      />
    );
  }
}
