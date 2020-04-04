import React from 'react';
import { create } from "react-test-renderer";
import WarningMessage from '../WarningMessage';

describe('WarningMessage component', () => {
   test('match snapshot with error message provided in props 1/2', () => {
       const component = create(<WarningMessage message='This is serious error message' />);
       expect(component).toMatchSnapshot();
   });

   test('match snapshot with error message provided in props 2/2', () => {
        const component = create(<WarningMessage message='This is very different serious error message' />);
        expect(component).toMatchSnapshot();
    });

   test('return empty string if no error message is provided', () => {
      const component = create(<WarningMessage />);
      expect(component).toMatchSnapshot();
  });

});