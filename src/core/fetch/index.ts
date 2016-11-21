/**
 * Exports the appropriate fetch module for either the client or the server
 * based on the code that's importing it.
 */

import * as isoFetch from 'isomorphic-fetch';
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


function fetch(url: string, options?: RequestInit): Promise<Response> {
  return isoFetch(parseUrl(url), options);
}


export default fetch;
