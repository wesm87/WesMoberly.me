/**
 * Register route.
 */

import * as React from 'react';
import Register from './Register';


const path = '/register';

const render = async (state) => (
  <Register title="New User Registration" />
);


export default { path, render };
