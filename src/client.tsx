/**
 * Client-side entry point.
 */

import 'babel-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router';

import App from 'components/App';


const renderApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const appContainer = document.querySelector('app');

ReactDOM.render(renderApp(), appContainer);
