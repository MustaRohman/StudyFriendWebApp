import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TimetableForm from './index';
import Config from 'app/components/Config/';
import AddSubject from 'app/components/AddSubject/';
import SubjectList from 'app/components/SubjectList/';

describe('<TimetableForm />', () => {
  it('renders one <Config /> component', () => {
    const wrapper = shallow(<TimetableForm />);
    expect(wrapper.find(Config)).to.have.length(1);
  });
  it('renders one <AddSubject /> component when on second page of stepper', () => {
    const wrapper = shallow(<TimetableForm />);
    wrapper.setState({
      stepIndex: 1
    });
    expect(wrapper.find(AddSubject)).to.have.length(1);
  });
  it('renders one <SubjectList /> componentwhen on second page of stepper', () => {
    const wrapper = shallow(<TimetableForm />);
    wrapper.setState({
      stepIndex: 1
    });
    expect(wrapper.find(SubjectList)).to.have.length(1);
  });
  it('passes state to <Config />', () => {
    const wrapper = shallow(<TimetableForm />);
    wrapper.setState({
      name: 'testing',
      'exam-start-date': '2017-03-08',
      'revision-start-date': '2017-04-09',
      reward: {
        duration: 75
      },
      'break-duration': 15,
      'session-duration': 45
    });
    expect(wrapper.find(Config).props().name).to.equal('testing');
    expect(wrapper.find(Config).props().examStartDate).to.equal('2017-03-08');
    expect(wrapper.find(Config).props().rewardDuration).to.equal(75);
    expect(wrapper.find(Config).props().breakDuration).to.equal(15);
    expect(wrapper.find(Config).props().sessionDuration).to.equal(45);
  });
});
