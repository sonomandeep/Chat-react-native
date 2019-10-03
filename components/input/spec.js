/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import CustomTextInput from './CustomTextInput';
import InputField from './InputField';

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

describe('CustomTextInput', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      let value = 'initialValue';
      const onChangeText = v => {
        value += v;
      };

      const component = shallow(
        <CustomTextInput
          placeholder="CustomTextInput"
          value={value}
          onChangeText={onChangeText}
          style={{}}
        />
      );
      expect(component).toMatchSnapshot();
    });
  });
});

describe('InputField', () => {
  describe('Rendering', () => {
    it('should match to snapshot', () => {
      let value = 'initialValue';
      const onChangeText = v => {
        value += v;
      };

      const component = shallow(
        <InputField
          placeHolder="Input field"
          onChangeHandler={onChangeText}
          value={value}
          error={false}
          secureTextEntry
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
