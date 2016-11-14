/**
 * Server-side fetch functionality.
 */


import * as Promise from 'bluebird';
import * as fetch from 'node-fetch';
import config from 'config';

const { Request, Headers, Response } = fetch;

fetch.Promise = Promise;
Response.Promise = Promise;

function localUrl(url) {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  return `http://${config.get('server.host')}${url}`;
}

function localFetch(url, options) {
  return fetch(localUrl(url), options);
}

export default localFetch;

export { Request, Headers, Response };
