/**
 * Home route.
 */

import * as React from 'react';
import fetch from 'core/fetch';
import Home from 'routes/home/Home';

const path = '/';

const render = async (state) => {
  const response = await fetch('/graphql?query={news{title,link,contentSnippet}}');
  const { data } = await response.json();

  return (
    <Home news={data.news} />
  );
};

export default { path, render };
