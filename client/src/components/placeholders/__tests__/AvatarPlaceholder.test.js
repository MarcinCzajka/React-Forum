import React from 'react';
import { create } from "react-test-renderer";
import AvatarPlaceholder from '../AvatarPlaceholder';

describe('Captcha component', () => {
    test('match snapshot', () => {
        const component = create(<AvatarPlaceholder />);
        expect(component).toMatchSnapshot();
    });

});