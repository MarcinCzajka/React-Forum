import React from 'react';
import { create } from "react-test-renderer";
import SignUpForm from './SignUpForm';
import { UserProvider } from '../../contexts/UserContext';

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

const loggedIn = bool => {
    return {
        loggedIn: bool,
        addShowSignupToContext: function(){}
    }
}

describe('SignUpForm component', () => {
    test('match snapshot w/o user logged in', () => {
        const component = create(<UserProvider value={loggedIn(false)}><SignUpForm /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w user logged in', () => {
        const component = create(<UserProvider value={loggedIn(true)}><SignUpForm /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

});