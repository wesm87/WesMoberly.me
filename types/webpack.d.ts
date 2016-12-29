
declare module 'webpack' {
  import * as UglifyJS from 'uglify-js';

  type LoaderOptions = {
    options: {
      [key: string]: any,
    },
  }

  interface Plugin {}

  interface DefinePlugin {
    new(definitions: any): Plugin;
  }

  interface NamedModulesPlugin {
    new(): Plugin;
  }

  interface LoaderOptionsPlugin {
    new(options: LoaderOptions): Plugin;
  }

  interface HotModuleReplacementPlugin {
      new(options?: any): Plugin;
  }

  interface OccurrenceOrderPlugin {
    new(options?: any): Plugin;
  }

  interface UglifyJsPlugin {
    new(options?: UglifyJS.MinifyOptions): Plugin;
  }

  interface CommonsChunkPlugin {
      new(chunkName: string, filenames?: string|string[]): Plugin;
      new(options?: any): Plugin;
  }

  interface WebpackConfig {}

  interface Webpack {
    (config: WebpackConfig, callback?: Function): any;
    DefinePlugin: DefinePlugin;
    NamedModulesPlugin: NamedModulesPlugin;
    LoaderOptionsPlugin: LoaderOptionsPlugin;
    HotModuleReplacementPlugin: HotModuleReplacementPlugin;
    optimize: {
      UglifyJsPlugin: UglifyJsPlugin,
      CommonsChunkPlugin: CommonsChunkPlugin,
      OccurrenceOrderPlugin: OccurrenceOrderPlugin,
    };
  }

  const webpack: Webpack;

  export default webpack;
}
