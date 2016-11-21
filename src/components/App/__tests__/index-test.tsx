/**
 * Unit tests.
 */

jest.unmock('components/App');

import * as React from 'react';
import App from 'components/App';

describe('App', () => {
  it('renders children correctly', () => {
    const app = (
      <App>
        <div className="child" />
      </App>
    );
    const wrapper = shallow(app);
    expect(wrapper.contains(<div className="child" />)).toBe(true);
  });
});
