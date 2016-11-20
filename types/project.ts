/**
 * Project-level typedefs.
 */

declare interface Array<T> {
  includes: (search: T) => boolean;
}

// tslint:disable no-reserved-keywords
declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
// tslint:enable no-reserved-keywords
