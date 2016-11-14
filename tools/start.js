
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config.babel';
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
    const bundler = webpack(webpackConfig);
    const serverHost = 'localhost';
    const serverPort = 3000;
    const serverURL = makeURL(serverHost, serverPort);
    const webpackHost = serverHost;
    const webpackPort = 3001;
    const webpackURL = makeURL(webpackHost, webpackPort);


    new WebpackDevServer(bundler, {
      hot: true,
      historyApiFallback: true,
      publicPath: webpackConfig.output.publicPath,
      contentBase: webpackConfig.output.path,
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
