import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';

import Datepicker from 'app/components/Datepicker/';

describe('<Datepicker />', () => {
  it("Today's Date button picks correct value />'s '", () => {
    // const date = moment('2017-03-01').format('YYYY-MM-DD');
    // const testing = (newDate) => {
    //   date: newDate.format('YYYY-MM-DD');
    // };
    // const wrapper = shallow(<Datepicker name="start-date" date={moment('2017-03-01')} onNewDate={testing}/>);
    // wrapper.find('.react-datepicker__today-button').simulate('click');
    // expect(date).equal(moment().format('YYYY-MM-DD'));
  });
});
