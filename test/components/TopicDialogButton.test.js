import React from 'react';
import { shallow } from 'enzyme';
import TopicListItem from 'app/components/TopicListItem/';
import TopicInputField from 'app/components/TopicInputField/';

import TopicDialogButton from 'app/components/TopicDialogButton';

describe('<TopicDialogButton />', () => {
  it('renders correct number of <TopicListItem /> ', () => {
    const test = () => {console.log(test);};
    const wrapper = shallow(<TopicDialogButton addTopic={test}/>);
    wrapper.setState({
      topicList: [
        'topic1',
        'topic2',
        'topic3',
      ]
    });
    expect(wrapper.find(TopicListItem)).to.have.length(3);
  });
  it('renders a <TopicInputField />', () => {
    const testing = () => {};
    const wrapper = shallow(<TopicDialogButton addTopic={testing}/>);
    expect(wrapper.find(TopicInputField)).to.have.length(1);
  });
});
