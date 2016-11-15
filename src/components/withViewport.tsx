/**
 * withViewport Higher-Order Component
 */

import * as React from 'react';
import * as EventEmitter from '@types/eventemitter3';

import { canUseDOM } from 'core/utils/DOM';

const { Component } = React;


interface Viewport {
  width: number;
  height: number;
}

interface Props {}

interface State {
  viewport: Viewport;
}


let EE;
let viewport: Viewport = { width: 1366, height: 768 }; // Default size for server-side rendering
const RESIZE_EVENT = 'resize';

function handleWindowResize() {
  if (viewport.width !== window.innerWidth || viewport.height !== window.innerHeight) {
    viewport = { width: window.innerWidth, height: window.innerHeight };
    EE.emit(RESIZE_EVENT, viewport);
  }
}

function withViewport(ComposedComponent) {
  return class WithViewport extends Component<Props, State> {

    constructor() {
      super();

      this.state = {
        viewport: canUseDOM ? { width: window.innerWidth, height: window.innerHeight } : viewport,
      };
    }

    public render() {
      return (
        <ComposedComponent {...this.props} viewport={this.state.viewport} />
      );
    }

    protected componentDidMount() {
      if (!EE) {
        EE = new EventEmitter();
        window.addEventListener('resize', handleWindowResize);
        window.addEventListener('orientationchange', handleWindowResize);
      }

      EE.on(RESIZE_EVENT, this.handleResize, this);
    }

    protected componentWillUnmount() {
      EE.removeListener(RESIZE_EVENT, this.handleResize, this);
      if (!EE.listeners(RESIZE_EVENT, true)) {
        window.removeEventListener('resize', handleWindowResize);
        window.removeEventListener('orientationchange', handleWindowResize);
        EE = null;
      }
    }

    protected handleResize = (value) => {
      this.setState({ viewport: value });
    }
  };
}


export default withViewport;
