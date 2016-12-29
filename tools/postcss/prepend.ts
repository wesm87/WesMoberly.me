
import * as fs from 'mz/fs';
import * as postcss from 'postcss';

/**
 * PostCSS plugin that prepends the specified CSS file.
 */
export default postcss.plugin<string>('postcss-prepend', (cssPath) => (
  (css) => {
    try {
      const resolvedPath = require.resolve(cssPath);

      return fs.readFile(resolvedPath, 'utf8')
        .then((data) => postcss.parse(data, { from: resolvedPath }))
        .then((normRoot) => css.prepend(normRoot));
    } catch (error) {
      console.log(error);
      return false;
    }
  }
));
