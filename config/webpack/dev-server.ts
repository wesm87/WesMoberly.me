/**
 * Webpack dev server config.
 */

import makeConfig from '../../tools/make-config';


export default makeConfig({
  host: 'localhost',
  port: process.env.WEBPACK_PORT || 3002,
});
