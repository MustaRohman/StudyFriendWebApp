import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ListItem from './index';

describe('<TopicListItem />', () => {
  it('renders name prop', () => {
    const testing = () => {};
    const wrapper = shallow(<ListItem name="test" itemDelete={testing}/>);
    expect(wrapper.instance().props.name).to.equal('test');
  });
});
