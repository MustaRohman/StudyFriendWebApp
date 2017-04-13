import React from 'react';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import Login from 'app/components/Login/';

describe('<Login />', () => {
  it('renders one h1 element', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('h1')).to.have.length(1);
  });
  it('renders one h2 element', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('h2')).to.have.length(1);
  });
  it('renders one <TextField /> element', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(TextField)).to.have.length(1);
  });
  it('renders one <Dialog /> element', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Dialog)).to.have.length(1);
  });
});
