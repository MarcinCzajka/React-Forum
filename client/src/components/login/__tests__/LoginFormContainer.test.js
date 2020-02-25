import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import LoginFormContainer from '../LoginFormContainer';
import { UserProvider } from '../../../contexts/UserContext';
import { LocaleProvider } from '../../../contexts/LocaleContext';
import locale from '../../../locale/en/dictionary.json';

//This line is needed to render semantic-ui Modal content because of Portals used in this component
jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

const context = (loggedIn) => {
    return {
        loggedIn: loggedIn,
        addShowLoginToContext: function(){},
        showSignup: function(){}
    }
}

describe('LoginFormContainer component', () => {
    test('renders without crashing', () => {
        shallow(<LocaleProvider value={locale}>
                <UserProvider value={context('')}>
                    <LoginFormContainer />
                </UserProvider>
            </LocaleProvider>
        );
    });

    test('displays correct button when logged in', () => {
        const component = create(<LocaleProvider value={locale}>
                <UserProvider value={context(true)}>
                    <LoginFormContainer />
                </UserProvider>
            </LocaleProvider>
        );
        expect(component).toMatchSnapshot();
    });

    test('displays correct button when logged out', () => {
        const component = create(<LocaleProvider value={locale}>
                <UserProvider value={context(false)}>
                    <LoginFormContainer />
                </UserProvider>
            </LocaleProvider>
        );
        expect(component).toMatchSnapshot();
    });

});