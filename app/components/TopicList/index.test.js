import React from 'react';
import { shallow } from 'enzyme';

import TopicList from './index';
import TopicListItem from 'app/components/TopicListItem';
import TopicInputField from 'app/components/TopicInputField';

describe('<TopicList />', () => {
  it("renders correct number of <TopicListItem />'s '", () => {
    const testing = () => {};
    const wrapper = shallow(<TopicList addTopic={testing}/>);
    wrapper.setState({
      topicList: [
        'topic1',
        'topic2',
        'topic3'
      ]
    });
    expect(wrapper.find(TopicListItem)).to.have.length(3);
  });
  it('renders a <TopicInputField />', () => {
    const testing = () => {};
    const wrapper = shallow(<TopicList addTopic={testing}/>);
    expect(wrapper.find(TopicInputField)).to.have.length(1);
  });
});
