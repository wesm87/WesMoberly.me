/**
 * Webpack loader options.
 */

import env from './env';
import paths from './paths';
import makeConfig from '../../tools/make-config';
import postcssPrepend from '../../tools/postcss/prepend';


export default makeConfig({
  minimize: env.isProd,
  debug: env.isDev,
  sassLoader: {
    outputStyle: 'expanded',
    precision: 10,
    includePaths: [
      paths.source,
      paths.modules,
    ],
  },
  postcss: [
    require('postcss-em-media-query'),
    require('postcss-pxtorem')({
      replace: false,
      mediaQuery: false,
      minPixelValue: 4,
      unitPrecision: 10,
      propWhiteList: [],
    }),
    require('postcss-initial'),
    require('postcss-selector-matches')({ lineBreak: true }),
    require('postcss-pseudo-class-enter'),
    require('postcss-pseudo-class-any-link'),
    require('postcss-pseudo-class-any-button'),
    require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: [
        'last 2 versions',
        'android 4',
        'ie >= 8',
        '> 1%',
      ],
    }),
    postcssPrepend('normalize.css/normalize.css'),
  ],
});
