import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import TopPanel from './TopPanel';
import { UserProvider } from '../../contexts/UserContext';

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


describe('LoginForm component', () => {
    test('renders without crashing', () => {
        shallow(<Router><TopPanel /></Router>);
    });

    test('match snapshot w/o user logged in', () => {
        const component = create(<UserProvider value={context(false)}><Router><TopPanel /></Router></UserProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w user logged in', () => {
        const component = create(<UserProvider value={context(true)}><Router><TopPanel /></Router></UserProvider>);
        expect(component).toMatchSnapshot();
    });

});