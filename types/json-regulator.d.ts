/**
 * Custom typedef for `json-regulator` package.
 */

declare module 'json-regulator' {
  type RegulatorKeys = string | string[];

  interface Regulate {
    (
      config: JSON,
      promotions: RegulatorKeys,
      eliminations?: RegulatorKeys,
      immutables?: RegulatorKeys,
      options?: {
        overwrite?: boolean;
      },
    ): JSON;
  }

  export default Regulate;
}
