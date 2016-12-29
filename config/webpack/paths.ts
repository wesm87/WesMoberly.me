/**
 * Webpack paths.
 */

import * as path from 'path';
import makeConfig from '../../tools/make-config';


interface PathConfig {
  root?: string;
  source?: string;
  dest?: string;
  config?: string;
  modules?: string;
}

const rootPath = path.resolve(__dirname, '../../');


export default <PathConfig> makeConfig({
  root: rootPath,
  source: path.join(rootPath, 'src'),
  dest: path.join(rootPath, 'build'),
  config: path.join(rootPath, 'config'),
  modules: path.join(rootPath, 'node_modules'),
});
