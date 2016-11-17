/**
 * Routes.
 */

import * as React from 'react';
import * as reactRouter from 'react-router';
import * as reactRouterRedux from 'react-router-redux';
import fetch from 'core/fetch';
import App from 'components/App';
import ContentPage from 'components/ContentPage';
import NotFoundPage from 'components/NotFoundPage';
import ErrorPage from 'components/ErrorPage';

const {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} = reactRouter;

const { syncHistoryWithStore } = reactRouterRedux;

const routes = [
  require('./routes/home'),
  require('./routes/contact'),
  require('./routes/login'),
  require('./routes/register'),
];

const router = new Router((on) => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  routes.forEach((route) => {
    on(route.path, route.action);
  });

  on('*', async (state) => {
    const query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`;
    const response = await fetch(query);
    const { data } = await response.json();
    return data && data.content && <ContentPage {...data.content} />;
  });

  on('error', (state, error) => (
    <App context={state.context} error={error}>
      {state.statusCode === 404 ? <NotFoundPage /> : <ErrorPage />}
    </App>
  ));
});

export default router;
