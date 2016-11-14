
import React, { PureComponent, PropTypes } from 'react';
import { Link as RouterLink } from 'react-router';
import cx from 'classnames';
import url from 'url';
import Location from 'core/Location';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends PureComponent {

  static propTypes = {
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.func,
    ]).isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
    onClick: PropTypes.func,
  };

  getClassNames = () => {
    const { className } = this.props;

    return cx('o-link', {
      className,
    });
  }

  isExternal = () => {
    const { to } = this.props;
    const protocol = url.parse(to).protocol;

    return (protocol === 'http:' || protocol === 'https:');
  }

  handleClick = (event) => {
    let allowTransition = true;

    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      if (this.props.to) {
        Location.push(this.props.to);
      } else {
        Location.push({
          pathname: event.currentTarget.pathname,
          search: event.currentTarget.search,
        });
      }
    }
  };

  render() {
    const { to, children, ...props } = this.props;
    const LinkComponent = this.isExternal() ? 'a' : RouterLink;

    return (
      <LinkComponent
        {...props}
        href={Location.createHref(to)}
        onClick={this.handleClick}
      >
        {children}
      </LinkComponent>
    );
  }
}

export default Link;
