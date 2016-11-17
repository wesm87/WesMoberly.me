/**
 * Project-level declarations.
 */

// tslint:disable no-reserved-keywords

declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

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

interface ComponentContext {
  insertCss?(): void;
  onSetTitle?(title: string): void;
  onSetMeta?(key: string, value: string): void;
  onPageNotFound?(): void;
}

interface Array<T> {
  includes: (search: T) => boolean;
}
