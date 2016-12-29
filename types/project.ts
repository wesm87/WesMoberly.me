/**
 * Project-level typedefs.
 */

declare interface Array<T> {
  includes: (search: T) => boolean;
}

declare interface AssetsJSON {
  client: {
    css?: string;
    js?: string;
  };
  vendor: {
    css?: string;
    js?: string;
  };
}

declare type ViewTemplateData = {
  body?: string,
  assets?: AssetsJSON,
  error?: {
    status?: number | string,
    message?: string,
    stack?: JSON,
  },
}

declare interface RenderTemplate {
  (data: ViewTemplateData): string;
}
