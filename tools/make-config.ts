/**
 * Takes a base config object that contains default config settings. The base
 * config object can also contain environment-specific configuration settings.
 * Any environment-specific settings will override the default settings. The
 * updated config is then returned.
 *
 * @example {
 *   server: {
 *     protocol: 'https',
 *     host: 'default.example.com',
 *     port: 80,
 *   },
 *   development: {
 *     server: {
 *       protocol: 'http',
 *       host: 'localhost',
 *       port: 3000,
 *     }
 *   },
 *   production {
 *     server: {
 *       host: 'production.example.com',
 *     },
 *   },
 * }
 */

import { get, isFunction } from 'lodash';
import regulate from 'json-regulator';

type BaseConfig = {
  [key: string]: any;
};
type ConfigStrict = BaseConfig;
type Config = ConfigStrict & {
  get(propPath: string | string[], defaultValue?: any): any;
};

function makeConfigStrict(baseConfig: BaseConfig): ConfigStrict {
  const isDev = (process.env.NODE_ENV !== 'production');
  const devKey = 'development';
  const prodKey = 'production';
  const promoteKeys = isDev ? devKey : prodKey;
  const removeKeys = isDev ? prodKey : devKey;

  return regulate(baseConfig, promoteKeys, removeKeys);
}

function makeConfig(baseConfig: BaseConfig): Config {
  const config = <Config> makeConfigStrict(baseConfig);

  /**
   * Config value getter. If the value is a function, the function is bound
   * to the config object (so `this` inside the function refers to the config
   * object) and the function's return value is returned.
   *
   * @see https://lodash.com/docs/4.16.6#get
   */
  config.get = (propPath, defaultValue?) => {
    const prop = get(config, propPath, defaultValue);

    if (isFunction(prop)) {
      return prop.bind(config)();
    }

    return prop;
  };

  return config;
}


export {
  makeConfigStrict,
  makeConfig,
};

export default makeConfig;
