/**
 * Custom typedef for `json-regulator` package.
 */

declare module 'json-regulator' {
  type RegulatorKeys = string | string[];

  type Config = {
    [key: string]: any;
  };

  interface Regulate {
    (
      config: Config,
      promotions: RegulatorKeys,
      eliminations?: RegulatorKeys,
      immutables?: RegulatorKeys,
      options?: {
        overwrite?: boolean;
      },
    ): Config;
  }

  const regulate: Regulate;

  export default regulate;
}
