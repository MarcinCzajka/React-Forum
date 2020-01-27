import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('smoke test', () => {
   test('renders without crashing', () => {
      shallow(<App />);
    });
});