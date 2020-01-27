import React from 'react';
import { create } from "react-test-renderer";
import AboutMe from './AboutMe';

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

describe('AboutMe component', () => {


    test('match snapshot /w user logged in', () => {
        const component = create(<AboutMe />);
        expect(component).toMatchSnapshot();
    });

});