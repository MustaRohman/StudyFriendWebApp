import React from 'react';
import { shallow } from 'enzyme';

import ListItem from 'app/components/ListItem';

describe('<ListItem />', () => {
  it('renders name prop', () => {
    const testing = () => {};
    const wrapper = shallow(<ListItem name="test" itemDelete={testing}/>);
    expect(wrapper.instance().props.name).to.equal('test');
  });
});
