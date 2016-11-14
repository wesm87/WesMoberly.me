/**
 * History / location utils.
 */

import { createHistory, createMemoryHistory } from 'history';

const history = process.env.BROWSER ? createHistory() : createMemoryHistory();

export default history.location;
