
import { merge } from 'lodash';
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
import VendorChunkPlugin from 'webpack-vendor-chunk-plugin';
import eyeglass from 'eyeglass';
import autoprefixer from 'autoprefixer';
import postcssInitial from 'postcss-initial';
import postcssPxtorem from 'postcss-pxtorem';
import postcssSelectorMatches from 'postcss-selector-matches';
import postcssPseudoClassEnter from 'postcss-pseudo-class-enter';
import postcssPseudoClassAnyLink from 'postcss-pseudo-class-any-link';
import postcssPseudoClassAnyButton from 'postcss-pseudo-class-any-button';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

process.env.NODE_ENV = DEBUG ? 'development' : 'production';

const GLOBALS = {
  __DEV__: DEBUG,
};

const PATHS = {
  source: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build'),
};

//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  context: PATHS.source,

  output: {
    publicPath: '/',
    sourcePrefix: '  ',
  },

  cache: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  resolve: {
    extensions: ['*', '.scss', '.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [
      PATHS.source,
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: PATHS.source,
        loaders: [
          'babel-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'ts-loader',
        ],
      },
      {
        test: /\.css$/,
        include: PATHS.source,
        loaders: [
          'isomorphic-style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: PATHS.source,
        loaders: [
          'isomorphic-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.json$/,
        loaders: [
          'json-loader',
        ],
      },
      {
        test: /\.txt$/,
        loaders: [
          'raw-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loaders: [
          'url-loader?limit=10000',
        ],
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loaders: [
          'file-loader',
        ],
      },
      {
        test: /\.pug$/,
        include: PATHS.source,
        loaders: [
          'pug-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
    ]),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        cssLoader: {
          modules: true,
          sourceMap: DEBUG,
          minimize: !DEBUG,
          localIdentName: (
            DEBUG
            ? '[name]_[local]_[hash:base64:3]'
            : '[hash:base64:4]'
          ),
        },
        sassLoader: eyeglass({
          outputStyle: 'expanded',
          precision: 10,
          includePaths: [
            path.join(PATHS.source, 'components'),
          ],
          eyeglass: {
            root: path.join(PATHS.source, 'components'),
            buildDir: PATHS.build,
            assets: {
              httpPrefix: 'assets',
              sources: [
                {
                  directory: path.join(PATHS.source, 'assets'),
                },
              ],
            },
          },
        }),
        postcss: [
          postcssInitial(),
          postcssPxtorem({
            replace: false,
            mediaQuery: false,
            minPixelValue: 4,
            unitPrecision: 10,
            propWhiteList: [],
          }),
          postcssSelectorMatches({
            lineBreak: true,
          }),
          postcssPseudoClassEnter(),
          postcssPseudoClassAnyLink(),
          postcssPseudoClassAnyButton(),
          postcssFlexbugsFixes(),
          autoprefixer({
            browsers: [
              '> 1%',
              'last 2 versions',
              'android >= 4',
              'ios >= 7',
              'ie >= 9',
            ],
          }),
        ],
      },
    }),
  ],
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = merge({}, config, {
  entry: {
    client: './client.js',
    vendor: [
      'lodash',
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux',
    ],
  },
  output: {
    path: path.join(PATHS.build, 'public'),
    filename: DEBUG ? '[name].js?[hash]' : '[name].[hash].js',
  },
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin(
      merge({}, GLOBALS, { 'process.env.BROWSER': true }),
    ),
    new AssetsPlugin({
      path: PATHS.build,
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity,
    }),
    new VendorChunkPlugin('vendor'),
  ],
});

if (!DEBUG) {
  clientConfig.plugins = [
    ...clientConfig.plugins,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: VERBOSE,
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ];
}

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = merge({}, config, {
  entry: './server.js',
  output: {
    path: PATHS.build,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    /^\.\/assets$/,
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin(
      merge({}, GLOBALS, { 'process.env.BROWSER': false }),
    ),
  ],
});

module.exports = [clientConfig, serverConfig];
