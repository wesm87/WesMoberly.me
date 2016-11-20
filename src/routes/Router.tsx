/**
 * Exports either the BrowserRouter or ServerRouter depending on which bundle
 * is importing it.
 */

import { BrowserRouter, ServerRouter } from 'react-router';

export default process.env.BROWSER ? BrowserRouter : ServerRouter;
