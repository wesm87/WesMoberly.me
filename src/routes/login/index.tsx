/**
 * Login route.
 */

import * as React from 'react';
import Login from './Login';


const path = '/login';

const render = async (state) => (
  <Login title="Log In" />
);


export default { path, render };
