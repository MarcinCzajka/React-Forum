import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import Captcha from '../form/Captcha';

describe('Captcha component', () => {
    test('renders without crashing', () => {
        shallow(<Captcha />);
    });

    test('match snapshot', () => {
        const component = create(<Captcha />);
        expect(component).toMatchSnapshot();
    });

});