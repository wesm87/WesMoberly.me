/**
 * Renders either an internal router link or an external standard link.
 */

import 'node';
import * as React from 'react';
import * as ReactRouter from 'react-router';
import * as url from 'url';

import Location from 'core/Location';

const { PureComponent } = React;
const RouterLink = ReactRouter.Link;


interface Props {
  to: string;
  children?: React.ReactNode;
  onClick?: Function;
  className?: string;
  styleName?: string;
}

interface State {}


class Link extends PureComponent<Props, State> {
  public render() {
    const { children } = this.props;

    if (this.isExternal()) {
      return (
        <RouterLink
          {...this.props}
          {...this.getCustomProps()}
        >
          {children}
        </RouterLink>
      );
    }

    return (
      <a
        {...this.props}
        {...this.getCustomProps()}
      >
        {children}
      </a>
    );
  }

  protected getCustomProps = () => {
    const { to } = this.props;
    const href = Location.createHref(to);
    const onClick = this.handleClick;

    return { href, onClick };
  }

  protected isExternal = () => {
    const { to } = this.props;
    const protocol = url.parse(to).protocol;

    return (protocol === 'http:' || protocol === 'https:');
  }

  protected isLeftClickEvent = (event) => {
    return event.button === 0;
  }

  protected isModifiedEvent = (event) => {
    return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
  }

  protected handleClick = (event) => {
    const { to, onClick } = this.props;
    let allowTransition = true;

    if (onClick) {
      onClick(event);
    }

    if (this.isModifiedEvent(event) || !this.isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      allowTransition = false;
    }

    event.preventDefault();

    if (allowTransition) {
      if (to) {
        Location.push(to);
      } else {
        const { pathname, search } = event.currentTarget;

        Location.push({ pathname, search });
      }
    }
  };
}


export default Link;
