/**
 * Routes.
 */

import * as React from 'react';
import * as reactRouterRedux from 'react-router-redux';
import { Match, Miss, Link } from 'react-router';

import fetch from 'core/fetch';
import App from 'components/App';
import ContentPage from 'components/ContentPage';
import NotFoundPage from 'components/NotFoundPage';
import ErrorPage from 'components/ErrorPage';

import Router from './Router';

// const { syncHistoryWithStore } = reactRouterRedux;

import HomeRoute from './home';
import ContactRoute from './contact';
import LoginRoute from './login';
import RegisterRoute from './register';


const Routes = () => (
  <Router>
    <Link to={HomeRoute.path}>Home</Link>

    <Match exactly pattern={HomeRoute.path} render={HomeRoute.render} />
    <Miss component={NotFoundPage} />
  </Router>
);
//
// const router = new ServerRouter((on) => {
//   on('*', async (state, next) => {
//     const component = await next();
//     return component && <App>{component}</App>;
//   });
//
//   routes.forEach((route) => {
//     on(route.path, route.action);
//   });
//
//   on('*', async (state) => {
//     const query = `/graphql?query={content(path:"${state.path}"){path,title,content,component}}`;
//     const response = await fetch(query);
//     const { data } = await response.json();
//     return data && data.content && <ContentPage {...data.content} />;
//   });
//
//   on('error', (state, error) => (
//     <App error={error}>
//       {state.statusCode === 404 ? <NotFoundPage /> : <ErrorPage />}
//     </App>
//   ));
// });

export default Routes;
