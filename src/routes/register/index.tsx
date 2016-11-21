/**
 * Register route.
 */

import * as React from 'react';
import Register from './Register';

export default {
  path: '/register',
  title: 'Register',
  render: async (state) => (
    <Register title="New User Registration" />
  ),
};
