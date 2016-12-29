/**
 * Webpack env config.
 */

import makeConfig from '../../tools/make-config';


const isDev = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');

process.env.NODE_ENV = isDev ? 'development' : 'production';


interface EnvConfig {
  isProd?: boolean;
  isDev?: boolean;
  isVerbose?: boolean;
  whitelist?: string[];
}

export default <EnvConfig> makeConfig({
  isProd: !isDev,
  isDev,
  isVerbose,
  whitelist: [
    'NODE_ENV',
  ],
});
