/**
 * History / location utils.
 */

import * as history from 'history';

const { createHistory, createMemoryHistory } = history;

const baseHistory = process.env.BROWSER ? createHistory() : createMemoryHistory();

export default baseHistory;
