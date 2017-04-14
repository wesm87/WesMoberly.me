

import webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';
import { clientConfig } from '../webpack.config';
import run from './run';
import clean from './clean';
import copy from './copy';


const makeURL = (host, port) => `http:${host}:${port}`;

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start() {
  await run(clean);
  await run(copy.bind(undefined, { watch: true }));
  await new Promise((resolve) => {
    const bundler = webpack(clientConfig);
    const serverHost = 'localhost';
    const webpackHost = serverHost;
    const serverPort = 3000;
    const webpackPort = 3001;
    const serverURL = makeURL(serverHost, serverPort);
    const webpackURL = makeURL(webpackHost, webpackPort);


    new WebpackDevServer(bundler, {
      hot: true,
      historyApiFallback: true,
      publicPath: clientConfig.output.publicPath,
      contentBase: clientConfig.output.path,
      proxy: {
        '*': serverURL,
      },
    }).listen(webpackPort, webpackHost, (err) => {
      if (err) {
        console.log(err);
        return;
      }

      console.log('Webpack HMR server started at: %s', webpackURL);

      resolve();
    });
  });
}

export default start;
