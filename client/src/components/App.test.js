import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import App from './App';

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

describe('smoke test', () => {
   test('renders without crashing', () => {
      shallow(<App />);
    });

});