/**
 * Server-side fetch.
 */

import fetch, { RequestInit, Response } from 'node-fetch';
import { trimStart } from 'lodash';

import config from 'config';


function parseUrl(url: string): string {
  if (url.startsWith('//')) {
    return `https:${url}`;
  }

  if (url.startsWith('http')) {
    return url;
  }

  const serverHost = <string> config.get('server.host');
  const urlTrimmed = trimStart(url, '/');

  return `http://${serverHost}/${urlTrimmed}`;
}


function customFetch(url: string, options?: RequestInit): Promise<Response> {
  return fetch(parseUrl(url), options);
}


export default customFetch;
