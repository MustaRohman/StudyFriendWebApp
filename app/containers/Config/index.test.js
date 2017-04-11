import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import Config from './index';
import Datepicker from 'app/components/Datepicker';

describe('<Config />', () => {
  it('renders 2 <Datepicker /> components', () => {
    const testing = () => {};
    const wrapper = shallow(<Config onNewConfig={testing}
    onSessionDurationChange={testing}
    onNameChange={testing}
    onBreakDurationChange={testing}
    onRewardDurationChange={testing}
    onRevisionDateChange={testing}
    onExamDateChange={testing}
    name={'testing'}
    examStartDate={moment().format('YYYY-MM-DD')}
    revisionStartDate={moment().format('YYYY-MM-DD')}
    sessionDuration={45}
    breakDuration={15}
    rewardDuration={75}
    />);
    expect(wrapper.find(Datepicker)).to.have.length(2);
  });
  it('renders one <TextField />', () => {
    const testing = () => {};
    const wrapper = shallow(<Config onNewConfig={testing}
    onSessionDurationChange={testing}
    onNameChange={testing}
    onBreakDurationChange={testing}
    onRewardDurationChange={testing}
    onRevisionDateChange={testing}
    onExamDateChange={testing}
    name={'testing'}
    examStartDate={moment().format('YYYY-MM-DD')}
    revisionStartDate={moment().format('YYYY-MM-DD')}
    sessionDuration={45}
    breakDuration={15}
    rewardDuration={75}
    />);
    expect(wrapper.find(TextField)).to.have.length(1);
  });
  it('renders 2 input[type=range]', () => {
    const testing = () => {};
    const wrapper = shallow(<Config onNewConfig={testing}
    onSessionDurationChange={testing}
    onNameChange={testing}
    onBreakDurationChange={testing}
    onRewardDurationChange={testing}
    onRevisionDateChange={testing}
    onExamDateChange={testing}
    name={'testing'}
    examStartDate={moment().format('YYYY-MM-DD')}
    revisionStartDate={moment().format('YYYY-MM-DD')}
    sessionDuration={45}
    breakDuration={15}
    rewardDuration={75}
    />);
    expect(wrapper.find('input[type="range"]')).to.have.length(3);
  });
});
