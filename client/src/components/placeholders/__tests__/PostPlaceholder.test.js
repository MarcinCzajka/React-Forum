import React from 'react';
import { create } from "react-test-renderer";
import PostPlaceholder from '../PostPlaceholder';

describe('Captcha component', () => {
    test('match snapshot', () => {
        const component = create(<PostPlaceholder />);
        expect(component).toMatchSnapshot();
    });

});