import React from 'react';
import { shallow } from 'enzyme';

import Login from 'app/components/Login/';

describe('<Login />', () => {
  it('renders one h1 element', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('h1')).to.have.length(1);
  });
});
