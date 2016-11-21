/**
 * Home route.
 */

import * as React from 'react';
import fetch from 'core/fetch';
import Home from 'routes/home/Home';

export default {
  path: '/',
  title: 'Home',
  exactly: true,
  render: async () => {
    const response = await fetch('/graphql?query={news{title,link,contentSnippet}}');
    const { data } = await response.json();

    return (
      <Home news={data.news} />
    );
  },
};
