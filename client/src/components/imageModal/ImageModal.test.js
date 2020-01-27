import React from 'react';
import { create } from "react-test-renderer";
import { shallow } from 'enzyme';
import ImageModal from './ImageModal';

jest.mock('semantic-ui-react/dist/commonjs/addons/Portal/Portal', () => ({ children }) => children);

const redDotBase64 = `data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
    9TXL0Y4OHwAAAABJRU5ErkJggg==`;

describe('ImageModal component', () => {
    test('renders without crashing', () => {
        shallow(<ImageModal />);
    });

    test('match snapshot w/o image source', () => {
        const component = create(<ImageModal />);
        expect(component).toMatchSnapshot();
    });

    test('match snapshot /w image source', () => {
        const component = create(<ImageModal image={redDotBase64} alt="sample alt text" />);
        expect(component).toMatchSnapshot();
    });

});