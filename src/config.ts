/* tslint:disable:max-line-length no-invalid-this */

/**
 * Project config.
 */

import * as _ from 'lodash';
import * as path from 'path';


const configs = {
  default: {
    paths: {
      root: path.resolve(__dirname, '../'),
      source: () => {
        const rootPath = this.paths.root;
        return path.resolve(rootPath, 'src');
      },
      dest: () => {
        const rootPath = this.paths.root;
        return path.resolve(rootPath, 'build');
      },
    },

    server: {
      port: process.env.SERVER_PORT || 3000,
      host: process.env.SERVER_HOST || 'localhost',
      url: () => `${this.server.host}:${this.server.port}`,
    },

    db: {
      url: process.env.DATABASE_URL || 'postgresql://demo:Lqk62xg6TBm5UhfR@demo.ctbl5itzitm4.us-east-1.rds.amazonaws.com:5432/membership01',
    },

    date: {
      displayFormat: 'M-D-YY',
    },

    auth: {
      jwt: {
        secret: process.env.JWT_SECRET || 'React Starter Kit',
      },

      // https://developers.facebook.com/
      facebook: {
        id: process.env.FACEBOOK_APP_ID || '186244551745631',
        secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
      },

      // https://cloud.google.com/console/project
      google: {
        id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
        secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
      },

      // https://apps.twitter.com/
      twitter: {
        key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
        secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
      },
    },
  },
};

const env = process.env.NODE_ENV || 'development';
const baseConfig = configs.default;
const envConfig = configs[env] || {};
const config = _.merge({}, baseConfig, envConfig);

function configGet(propPath) {
  const prop = _.get(config, propPath);

  if (_.isFunction(prop)) {
    return prop.bind(config)();
  }

  return prop;
}

config.get = configGet.bind(config);


export default config;
