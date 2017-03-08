import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TopicListItem from './index';

describe('<TopicListItem />', () => {
  it('renders name prop', () => {
    const testing = () => {};
    const wrapper = shallow(<TopicListItem name="test" itemDelete={testing}/>);
    expect(wrapper.instance().props.name).to.equal('test');
  });
});
