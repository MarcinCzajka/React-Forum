import React from 'react';
import { create } from "react-test-renderer";
import Captcha from '../Captcha';

describe('Captcha component', () => {
    test('match snapshot', () => {
        const component = create(<Captcha />);
        expect(component).toMatchSnapshot();
    });

});