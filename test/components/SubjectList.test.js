import React from 'react';
import { shallow } from 'enzyme';

import SubjectList from 'app/components/SubjectList/';

describe('<SubjectList />', () => {
  it("renders correct number of li's '", () => {
    const subjects = [
      {
        name: 'test1'
      },
      {
        name: 'test2'
      },
      {
        name: 'test3'
      },
    ];
    const wrapper = shallow(<SubjectList subjects={subjects}/>);
    expect(wrapper.find('li')).to.have.length(3);
  });
});
