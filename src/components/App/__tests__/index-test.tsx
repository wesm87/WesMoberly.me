/* eslint-disable import/first */

jest.unmock('components/App');

import App from 'components/App';
import React from 'react';
import { shallow } from 'enzyme';

describe('App', () => {
  it('renders children correctly', () => {
    const app = (
      <App context={{ insertCss: () => {} }}>
        <div className="child" />
      </App>
    );
    const wrapper = shallow(app);
    expect(wrapper.contains(<div className="child" />)).toBe(true);
  });
});
