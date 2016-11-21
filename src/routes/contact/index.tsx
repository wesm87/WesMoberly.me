/**
 * Contact route.
 */

import * as React from 'react';
import Contact from './Contact';

export default {
  path: '/contact',
  title: 'Contact',
  render: async () => (
    <Contact title="Contact Us" />
  ),
};
