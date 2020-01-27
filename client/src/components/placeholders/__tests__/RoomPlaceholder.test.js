import React from 'react';
import { create } from "react-test-renderer";
import RoomPlaceholder from '../RoomPlaceholder';

describe('Captcha component', () => {
    test('match snapshot', () => {
        const component = create(<RoomPlaceholder />);
        expect(component).toMatchSnapshot();
    });

});