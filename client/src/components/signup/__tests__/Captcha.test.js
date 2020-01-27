import React from 'react';
import { shallow } from 'enzyme';
import Captcha from '../Captcha';

describe('Captcha component', () => {
    test('renders without crashing', () => {
        shallow(<Captcha />);
    });
});