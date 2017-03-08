import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import AddSubject from './index';
import TopicList from 'app/components/TopicList';

describe('<AddSubject />', () => {
  it('renders 1 input[type=text]', () => {
    const testing = () => {};
    const wrapper = shallow(<AddSubject addSubject={testing}/>);
    expect(wrapper.find('input[type="text"]')).to.have.length(1);
  });
  it('renders 1 input[type=number]', () => {
    const testing = () => {};
    const wrapper = shallow(<AddSubject addSubject={testing}/>);
    expect(wrapper.find('input[type="number"]')).to.have.length(1);
  });
  it('renders 1 <TopicList />', () => {
    const testing = () => {};
    const wrapper = shallow(<AddSubject addSubject={testing}/>);
    expect(wrapper.find(TopicList)).to.have.length(1);
  });
});
