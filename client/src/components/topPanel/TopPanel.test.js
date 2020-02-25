import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import TopPanel from './TopPanel';
import { UserProvider } from '../../contexts/UserContext';
import { LocaleProvider } from '../../contexts/LocaleContext';
import locale from '../../locale/en/dictionary.json';

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

const context = (loggedIn) => ({
    loggedIn: loggedIn,
    userName: (loggedIn ? 'example name' : undefined),
    pages: [
        {name: 'Page 1'},
        {name: 'Page 2'},
        {name: 'Page 3'}
    ],
    addShowLoginToContext: function(){},
    addShowSignupToContext: function(){}
});


describe('TopPanel component', () => {
    test('renders without crashing', () => {
        shallow(<LocaleProvider value={locale}>
                <Router>
                    <TopPanel />
                </Router>
            </LocaleProvider>
        );
    });

    test('match snapshot w/o user logged in', () => {
        const component = create(<LocaleProvider value={locale}>
                <UserProvider value={context(false)}>
                    <Router>
                        <TopPanel />
                    </Router>
                </UserProvider>
            </LocaleProvider>
        );
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w user logged in', () => {
        const component = create(<LocaleProvider value={locale}>
                <UserProvider value={context(true)}>
                    <Router>
                        <TopPanel />
                    </Router>
                </UserProvider>
            </LocaleProvider>
        );
        expect(component).toMatchSnapshot();
    });

});