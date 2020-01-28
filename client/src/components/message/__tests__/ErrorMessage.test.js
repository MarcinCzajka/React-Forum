import React from 'react';
import { create } from "react-test-renderer";
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage component', () => {
   test('match snapshot with error message provided in props', () => {
       const component = create(<ErrorMessage message='This is serious error message' />);
       expect(component).toMatchSnapshot();
   });

   test('return empty string if no error message is provided', () => {
      const component = create(<ErrorMessage />);
      expect(component).toMatchSnapshot();
  });

});