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
});
