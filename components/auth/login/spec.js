import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';

describe('Login', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(<Login />);
      expect(component).toMatchSnapshot();
    });
  });
});
