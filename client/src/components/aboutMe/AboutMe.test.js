import React from 'react';
import { create } from "react-test-renderer";
import AboutMe from './AboutMe';
import { UserProvider } from '../../contexts/UserContext';

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

describe('AboutMe component', () => {
    test('match snapshot /w user logged in 1/2', () => {
        const contextValue = {
            userName: 'User1',
            userEmail: 'Email@g.com',
            userCreatedAt: '2019-12-04T23:04:26.178Z'
        };

        const component = create(<UserProvider value={contextValue}><AboutMe /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w user logged in 2/2', () => {
        const contextValue = {
            userName: 'U s ER',
            userEmail: 'differentemail@gfds.com',
            userCreatedAt: '2020-02-04T11:32:00.178Z'
        };

        const component = create(<UserProvider value={contextValue}><AboutMe /></UserProvider>);
        expect(component).toMatchSnapshot();
    });

});