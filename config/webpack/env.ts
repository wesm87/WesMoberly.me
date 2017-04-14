/**
 * Webpack env config.
 */

import makeConfig from '../../tools/make-config';

interface EnvConfig {
  isProd?: boolean;
  isDev?: boolean;
  isVerbose?: boolean;
  whitelist?: string[];
}

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

const isDev = (process.env.NODE_ENV !== 'production');

export default <EnvConfig> makeConfig({
  isDev,
  isProd: !isDev,
  isVerbose: false,
  whitelist: [
    'NODE_ENV',
  ],
});
