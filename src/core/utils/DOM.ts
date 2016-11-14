/**
 * DOM-related utility functions.
 */

export function addEventListener(node, event: string, listener: Function): void {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else {
    node.attachEvent(`on${event}`, listener);
  }
}

export function removeEventListener(node, event: string, listener: Function): void {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent(`on${event}`, listener);
  }
}

export function canUseDOM(): boolean {
  return !!(
    window !== undefined
    && window !== null
    && window.document
    && window.document.createElement
  );
}
