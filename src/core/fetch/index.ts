/**
 * Exports the appropriate fetch module for either the client or the server
 * based on the code that's importing it.
 */

const fetch = process.env.BROWSER ? require('./client') : require('./server');

export default fetch;
