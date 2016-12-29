
import * as path from 'path';
import { ncp } from 'ncp';
import * as Bluebird from 'bluebird';

const gaze = require('gaze');
const replace = require('replace');

const ncpAsync = Bluebird.promisify(ncp);

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy({ watch }) {
  await Promise.all([
    ncpAsync('src/public', 'build/public'),
    ncpAsync('src/content', 'build/content'),
    ncpAsync('package.json', 'build/package.json'),
  ]);

  replace({
    regex: '"start".*',
    replacement: '"start": "node server.js"',
    paths: ['build/package.json'],
    recursive: false,
    silent: false,
  });

  if (watch) {
    const watcher: any = await new Promise((resolve, reject) => {
      gaze('src/content/**/*.*', (err, val) => (err ? reject(err) : resolve(val)));
    });
    watcher.on('changed', async (file) => {
      const relPath = file.substr(path.join(__dirname, '../src/content/').length);
      await ncpAsync(`src/content/${relPath}`, `build/content/${relPath}`);
    });
  }
}

export default copy;
