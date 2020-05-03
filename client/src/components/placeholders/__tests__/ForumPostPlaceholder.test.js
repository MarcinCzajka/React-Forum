import React from 'react';
import { create } from "react-test-renderer";
import ForumPostPlaceholder from '../ForumPostPlaceholder';

describe('Captcha component', () => {
    test('match snapshot', () => {
        const component = create(<ForumPostPlaceholder />);
        expect(component).toMatchSnapshot();
    });

});