import React from 'react';
import { create } from "react-test-renderer";
import SignUpForm from '../form/SignUpForm';

//This line is needed to render semantic-ui Modal content because of Portals used in this component
jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

describe('SignUpForm component', () => {
    test('match snapshot', () => {
        const component = create(<SignUpForm />);
        expect(component).toMatchSnapshot();
    });

});