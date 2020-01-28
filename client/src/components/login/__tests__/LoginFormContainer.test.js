import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import LoginFormContainer from '../LoginFormContainer';
import { UserProvider } from '../../../contexts/UserContext';

const context = (loggedIn) => {
    return {
        loggedIn: loggedIn,
        addShowLoginToContext: function(){},
        showSignup: function(){}
    }
}

describe('LoginFormContainer component', () => {
    test('renders without crashing', () => {
        shallow(<UserProvider value={context('')}><LoginFormContainer /></UserProvider>);
    });

    test('displays correct button when logged in', () => {
        const component = create(<UserProvider value={context(true)}><LoginFormContainer /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

    test('displays correct button when logged out', () => {
        const component = create(<UserProvider value={context(false)}><LoginFormContainer /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

});