/**
 * Login route.
 */

import * as React from 'react';
import Login from './Login';

export default {
  path: '/login',
  title: 'Login',
  render: async (state) => (
    <Login title="Log In" />
  ),
};
