
import { merge } from 'lodash';
import * as path from 'path';
import * as fs from 'fs';
import webpack from 'webpack';

import { makeConfigStrict as makeConfig } from './tools/make-config';

import env from './config/webpack/env';
import paths from './config/webpack/paths';
import loaderOptions from './config/webpack/loader-options';
import devServerConfig from './config/webpack/dev-server';

const combineLoaders = require('webpack-combine-loaders');
const AssetsPlugin = require('assets-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const EnvironmentPlugin = require('inline-environment-variables-webpack-plugin');
const VendorChunkPlugin = require('webpack-vendor-chunk-plugin');

const host = devServerConfig.get('host');
const port = devServerConfig.get('port');

const GLOBALS = {
  __DEV__: env.isDev,
};

function styleLoaders(type = 'sass') {
  const styleLoader = 'style-loader';
  const cssLoaders = combineLoaders([
    {
      loader: 'css-loader',
      query: {
        modules: true,
        importLoaders: 1,
        sourceMap: env.isDev,
        minimize: env.isProd,
        context: paths.source,
        localIdentName: env.isDev ? '[path][name]__[local]--[hash:base64:5]' : '[local]--[hash:base64:5]',
      },
    },
    'postcss-loader',
  ]);
  const sassLoaders = combineLoaders([cssLoaders, 'sass-loader']);
  const loaders = (type === 'css') ? cssLoaders : sassLoaders;

  if (env.isProd) {
    return ExtractTextPlugin.extract({
      fallbackLoader: styleLoader,
      loader: loaders,
    });
  }

  return [styleLoader, loaders];
}

const nodeModules = {};
fs.readdirSync(path.join(__dirname, 'node_modules'))
  .filter((x) => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });


//
// Common configuration chunk to be used for both
// client-side (client.js) and server-side (server.js) bundles
// -----------------------------------------------------------------------------

const config = {
  context: paths.source,

  output: {
    publicPath: '/assets/',
    sourcePrefix: '  ',
  },

  cache: env.isDev,

  stats: {
    colors: true,
    timings: true,
    reasons: env.isDev,
    hash: env.isVerbose,
    version: env.isVerbose,
    chunks: env.isVerbose,
    chunkModules: env.isVerbose,
    cached: env.isVerbose,
    cachedAssets: env.isVerbose,
  },

  resolve: {
    extensions: ['*', '.scss', '.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [
      paths.source,
      'node_modules',
    ],
  },

  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.ts(x)?$/,
        include: paths.source,
        loader: 'tslint-loader',
      },
      {
        test: /\.ts(x?)$/,
        include: paths.source,
        loaders: [
          'babel-loader',
          'awesome-typescript-loader',
        ],
      },
      {
        test: /\.js(x?)$/,
        include: paths.source,
        loaders: [
          'babel-loader',
        ],
      },
      {
        test: /\.js$/,
        include: /node_modules\/defaults-deep/,
        loaders: [
          'unlazy-loader',
        ],
      },
      {
        test: /\.json$/,
        include: paths.source,
        loaders: [
          'json-loader',
        ],
      },
      {
        test: /\.css$/,
        include: paths.source,
        loaders: styleLoaders('css'),
      },
      {
        test: /\.scss$/,
        include: paths.source,
        loaders: styleLoaders('sass'),
      },
      {
        test: /\.pug$/,
        include: paths.source,
        loaders: [
          'pug-loader',
        ],
      },
      {
        test: /\.txt$/,
        include: paths.source,
        loaders: [
          'raw-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        include: paths.source,
        loaders: [
          'url-loader?limit=10000',
        ],
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        include: paths.source,
        loaders: [
          'file-loader',
        ],
      },
    ],
  },

  plugins: [
    new EnvironmentPlugin(env.whitelist, { warnings: false }),
    new webpack.LoaderOptionsPlugin({ options: loaderOptions }),
    new StatsPlugin('stats.json', {
      chunkModules: true,
      exclude: [/node_modules/],
    }),
  ],

  development: {
    devtool: 'cheap-module-eval-source-map',
  },

  production: {
    devtool: 'source-map',
  },
};


//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfigBase = merge({}, config, {
  entry: {
    'js/client': './client',
    'js/vendor': [
      'babel-polyfill',
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
    path: path.join(paths.dest, 'public'),
    filename: '[name].js?[hash]',
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin(
      merge({}, GLOBALS, { 'process.env.BROWSER': true }),
    ),
    new AssetsPlugin({
      path: paths.dest,
      filename: 'assets.json',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'js/vendor',
      filename: 'js/vendor.js',
      minChunks: Infinity,
    }),
    new VendorChunkPlugin('vendor'),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
});

const clientConfig = merge({}, clientConfigBase, makeConfig({
  development: {
    output: {
      publicPath: `http://${host}:${port}/`,
    },
    entry: {
      'js/client': [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${host}:${port}`,
        'webpack/hot/only-dev-server',
        clientConfigBase.entry['js/client'],
      ],
    },
    plugins: [
      ...clientConfigBase.plugins,
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
      hot: true,
      inline: true,
      compress: false,
      historyApiFallback: true,
      stats: {
        assets: true,
        children: false,
        chunks: false,
        hash: false,
        modules: false,
        publicPath: false,
        timings: true,
        version: false,
        warnings: true,
      },
    },
  },
  production: {
    output: {
      filename: '[name].[hash].js',
    },
    plugins: [
      ...clientConfigBase.plugins,
      new ExtractTextPlugin({
        filename: 'css/main.css',
        allChunks: true,
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: env.isVerbose,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        mangle: {
          screw_ie8: true,
        },
      }),
    ],
  },
}));


//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = merge({}, config, {
  entry: './server',
  output: {
    path: paths.dest,
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: {
    assets: 'assets',
  },
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

export { config, clientConfig, serverConfig };

export default [clientConfig, serverConfig];
