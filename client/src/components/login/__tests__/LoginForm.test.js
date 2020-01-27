import React from 'react';
import { create } from "react-test-renderer";
import LoginForm from '../LoginForm';
import { UserProvider } from '../../../contexts/UserContext';

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

const loggedIn = bool => {
    return {
        loggedIn: bool,
        addShowLoginToContext: function(){}
    }
}

describe('LoginForm component', () => {
    test('match snapshot w/o user logged in', () => {
        const component = create(<UserProvider value={loggedIn(false)}><LoginForm /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w user logged in', () => {
        const component = create(<UserProvider value={loggedIn(true)}><LoginForm /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

});