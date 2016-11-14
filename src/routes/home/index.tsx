/**
 * Home page route.
 */

import * as React from 'react';
import fetch from 'core/fetch';
import Home from 'routes/home/Home';

export const path = '/';
export const action = async (state) => {
  const response = await fetch('/graphql?query={news{title,link,contentSnippet}}');
  const { data } = await response.json();
  state.context.onSetTitle('React.js Starter Kit');
  return <Home news={data.news} />;
};
