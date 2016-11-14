
import { PureComponent } from 'react';
import withStyles from 'react-css-modules';
import Link from 'components/Link';


class Footer extends PureComponent {
  public render() {
    return (
      <div styleName="root">
        <div styleName="container">
          <span styleName="text">© Your Company</span>
          <span styleName="spacer">·</span>
          <Link styleName="link" to="/">Home</Link>
          <span styleName="spacer">·</span>
          <Link styleName="link" to="/privacy">Privacy</Link>
          <span styleName="spacer">·</span>
          <Link styleName="link" to="/not-found">Not Found</Link>
        </div>
      </div>
    );
  }
}


export default withStyles(Footer, require('./style.scss'));
