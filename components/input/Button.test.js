import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      const component = shallow(
        <Button pressHandler={() => console.log('Premuto')} text="Button" />
      );
      expect(component).toMatchSnapshot();
    });
  });
});
